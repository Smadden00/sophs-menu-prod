/*
This function will handle the get rated recipes request - recipes that the user has given ratings to
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

            // Get recipes that the user has rated along with their ratings
            const data = await pool.query(
                `SELECT r.recipe_name, r.recipe_id, rr.rating 
                 FROM recipes r 
                 INNER JOIN recipe_ratings rr ON r.recipe_id = rr.recipe_id 
                 WHERE rr.user_encrypted = $1
                 ORDER BY r.recipe_name`,
                [encrypted_identifier]
            ); 
            res.status(200).json({ body: data.rows });    
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the rated recipes and we could not complete your request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the rated recipes request wasnt GET');
    }
}
