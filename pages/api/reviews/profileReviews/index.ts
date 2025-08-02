/*
This function will handle the get profile reviews request
*/
import pool from "../../../../backend-utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import Encrypt from "../../../../components/functions/encrypt";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const encrypted_identifier = Encrypt(session.user.email);

            //ensure the session identifier is the same as the identifier requested
            const data = await pool.query(
                'SELECT rest_name, o_rating, user_encrypted, review_id FROM reviews WHERE user_encrypted = $1',
                [encrypted_identifier]
            ); 
            res.status(200).json({ body: data.rows });    
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the review and we could not complete your request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the review request wasnt GET');
    }

}