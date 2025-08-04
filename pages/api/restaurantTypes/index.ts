/*
This function will handle the get restaurant types request
*/
import pool from '../../../backend-utils';

export default async function handler(req, res) {
    const method = req.method;
    if (method === 'GET') {
        try {
            const data = await pool.query('SELECT rest_type FROM rest_types ORDER BY rest_type ASC');
            const restaurantTypes = data.rows.map(row => row.rest_type);
            res.status(200).json({ body: restaurantTypes });
        } catch (error) {
            res.status(500).json({
                message: "There was an error while fetching restaurant types and we could not complete your request. Error: " + error
            });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
