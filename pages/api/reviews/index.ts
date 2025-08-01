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
                return res.status(500).json({ message: 'The request was unauthorized' });
            }
            //encrypt the user identifier
            const user_encrypted = Encrypt(session.user.email)

            const {rest_name, o_rating, price, taste, experience, description, city, state_code} = JSON.parse(req.body);
            const response = await pool.query(`INSERT INTO reviews(rest_name, o_rating, price, taste, experience, description, city, state_code, soph_submitted, user_encrypted) VALUES ('${rest_name}', ${o_rating}, ${price}, ${taste}, ${experience}, '${description}', '${city}', '${state_code}', FALSE, '${user_encrypted}');`);
            res.status(200).json({message: response, body: req.body})
        } catch (error){
            res.status(500).json({ message: error })
        }
    }

}