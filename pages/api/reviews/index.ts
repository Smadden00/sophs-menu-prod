/*
This function will handle the get all reviews and put review
*/
import pool from '../../../backend-utils';
import Encrypt from '../../../components/functions/encrypt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res){
    const method = req.method;
    if (method == 'GET'){
        try{
            const client = await pool.connect()
            console.log('Connected to the database successfully');
            
            // Join reviews with restaurant types to get the type name
            const data = await client.query(`
                SELECT r.*, rt.rest_type 
                FROM reviews r
                LEFT JOIN rest_type_review_ref rtrr ON r.review_id = rtrr.review_id
                LEFT JOIN rest_types rt ON rtrr.rest_type_id = rt.rest_type_id
                ORDER BY r.review_id DESC
            `);
            
            client.release();
            res.status(200).json({ body: data });
        } catch (error) {
            res.status(500).json({message: 'There was an error and we could not complete your get all reviews request. Error: '+ error});
        }
    } else if (method == 'PUT'){
        try{

            //ensure the user is authorized to make a put request
            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                console.log("2")
                return res.status(401).json({ message: 'Unauthorized' });
            }
            //encrypt the user identifier
            const user_encrypted = Encrypt(session.user.email)

            const {rest_name, rest_type, o_rating, price, taste, experience, description, city, state_code} = JSON.parse(req.body);
            
            // Input validation
            if (!rest_name || !rest_type || !city || !state_code) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            // Validate numeric fields
            const numericFields = [o_rating, taste, experience];
            if (numericFields.some(field => isNaN(field) || field <= 0 || field >= 10)) {
                return res.status(400).json({ message: 'overall rating, taste, and experience fields must be numbers between 1-5' });
            }

            // Validate numeric fields
            if (isNaN(price) || price <= 0 || price > 4 ) {
                return res.status(400).json({ message: 'price field must be a number between 1-4' });
            }

            
            // Sanitize string inputs
            const sanitizedRestName = rest_name.trim().substring(0, 255);
            const sanitizedDescription = description ? description.trim().substring(0, 1000) : '';
            const sanitizedCity = city.trim().substring(0, 100);
            const sanitizedStateCode = state_code.trim().substring(0, 2);
            const sanitizedRestaurantType = rest_type.trim();

            const client = await pool.connect();
            
            try {
                // Start transaction
                await client.query('BEGIN');

                // Insert the review and get the review_id
                const reviewResult = await client.query(
                    'INSERT INTO reviews(rest_name, o_rating, price, taste, experience, description, city, state_code, soph_submitted, user_encrypted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING review_id',
                    [sanitizedRestName, o_rating, price, taste, experience, sanitizedDescription, sanitizedCity, sanitizedStateCode, false, user_encrypted]
                );
                    
                const reviewId = reviewResult.rows[0].review_id;
                    
                // Get the restaurant type ID
                const restTypeResult = await client.query(
                    'SELECT rest_type_id FROM rest_types WHERE rest_type = $1',
                    [sanitizedRestaurantType]
                );
                
                if (restTypeResult.rows.length === 0) {
                    throw new Error('Invalid restaurant type');
                }
                
                const restTypeId = restTypeResult.rows[0].rest_type_id;
                
                // Insert into the junction table
                await client.query(
                    'INSERT INTO rest_type_review_ref(rest_type_id, review_id) VALUES ($1, $2)',
                    [restTypeId, reviewId]
                );

                // Commit the transaction
                await client.query('COMMIT');
                
                res.status(200).json({message: "Review created successfully"});
            } catch (error) {
                // Rollback the transaction if any operation fails
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        } catch (error){
            console.error('Review creation error:', error);
            res.status(500).json({ message: 'Failed to create review' })
        }
    }

}