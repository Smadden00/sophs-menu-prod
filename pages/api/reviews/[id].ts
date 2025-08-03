/*
This function will handle the get review request
*/
import pool from "../../../backend-utils";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const { id } = req.query;
            const data = await pool.query(`
                SELECT r.*, rt.rest_type 
                FROM reviews r
                LEFT JOIN rest_type_review_ref rtr ON r.review_id = rtr.review_id
                LEFT JOIN rest_types rt ON rtr.rest_type_id = rt.rest_type_id
                WHERE r.review_id=${id};
            `);  
            res.status(200).json({ body: data.rows });
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the review and we could not complete your request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the review request wasnt GET');
    }

}