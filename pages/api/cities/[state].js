/*
This function will handle the get state request
*/
import pool from "../../../backend-utils";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const { state } = req.query;
            const data = await pool.query(`SELECT city FROM cities WHERE state_code='${state}' ORDER BY city ASC;`);
            res.status(200).json({ body: data.rows });
        } catch (error) {
            res.status(500).json({message: "There was an error and we could not complete your get cities request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the cities request wasnt GET');
    }

}