import pool from "../../../../backend-utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import Encrypt from "../../../../components/functions/encrypt";

export default async function handler(req, res) {
    const method = req.method;
    const { id } = req.query;
    
    // Validate and sanitize ID parameter
    const recipeId = parseInt(id as string, 10);
    if (isNaN(recipeId) || recipeId <= 0) {
        return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    if (method === "POST") {
        try {

            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            
            const user_encrypted = Encrypt(session.user.email);
            const { recipeId, rating } = req.body;
            
            // Validate rating
            if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
                return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
            }

            // Check if user has already rated this recipe
            const existingRating = await pool.query(
                'SELECT rating_id FROM recipe_ratings WHERE recipe_id = $1 AND user_encrypted = $2',
                [recipeId, user_encrypted]
            );

            if (existingRating.rows.length > 0) {
                // Update existing rating
                await pool.query(
                    'UPDATE recipe_ratings SET rating = $1, updated_at = CURRENT_TIMESTAMP WHERE recipe_id = $2 AND user_encrypted = $3',
                    [rating, recipeId, user_encrypted]
                );
            } else {
                // Insert new rating
                await pool.query(
                    'INSERT INTO recipe_ratings(recipe_id, user_encrypted, rating) VALUES ($1, $2, $3)',
                    [recipeId, user_encrypted, rating]
                );
            }

            res.status(200).json({ 
                message: 'Rating submitted successfully'
            });

        } catch (error) {
            console.error('Error submitting rating:', error);
            res.status(500).json({ message: "There was an error while submitting the rating. Error: " + error });
        }

    } else if (method === "GET") {
        try {
            //get the session of the user
            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const user_encrypted = Encrypt(session.user.email);
            const { id } = req.query;

            // Get user's rating of the recipe
            const usersRatingResult = await pool.query(
                'SELECT rating FROM recipe_ratings WHERE recipe_id = $1 AND user_encrypted = $2',
                [id, user_encrypted]
            );

            // If the user has not rated the recipe, return 0
            if (usersRatingResult.rows.length === 0) {
                return res.status(200).json({ usersRating: 0 });
            } else { //otherwise, return the user's rating
                const usersRating = usersRatingResult.rows[0].rating;
                return res.status(200).json({ usersRating });
            }

        } catch (error) {
            console.error('Error fetching users rating:', error);
            res.status(500).json({ message: "There was an error while fetching users rating. Error: " + error });
        }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
