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
            const data = await client.query('SELECT * FROM reviews;');
            res.status(200).json({ body: data });
        } catch (error) {
            res.status(500).json({message: 'There was an error and we could not complete your get all reviews request. Error: '+ error});
        }
    } else if (method == 'PUT'){
        try{

            //ensure the user is authorized to make a put request
            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            //encrypt the user identifier
            const user_encrypted = Encrypt(session.user.email)

            const {rest_name, o_rating, price, taste, experience, description, city, state_code} = JSON.parse(req.body);
            
            // Input validation
            if (!rest_name || !city || !state_code) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            // Validate numeric fields
            const numericFields = [o_rating, price, taste, experience];
            if (numericFields.some(field => isNaN(field) || field < 1 || field > 5)) {
                return res.status(400).json({ message: 'Rating fields must be numbers between 1-5' });
            }
            
            // Sanitize string inputs
            const sanitizedRestName = rest_name.trim().substring(0, 255);
            const sanitizedDescription = description ? description.trim().substring(0, 1000) : '';
            const sanitizedCity = city.trim().substring(0, 100);
            const sanitizedStateCode = state_code.trim().substring(0, 2);

            const response = await pool.query(
                'INSERT INTO reviews(rest_name, o_rating, price, taste, experience, description, city, state_code, soph_submitted, user_encrypted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                [sanitizedRestName, o_rating, price, taste, experience, sanitizedDescription, sanitizedCity, sanitizedStateCode, false, user_encrypted]
            );
            res.status(200).json({message: "Review created successfully"})
        } catch (error){
            console.error('Review creation error:', error);
            res.status(500).json({ message: 'Failed to create review' })
        }
    }

}