/*
This function will handle the get review request
*/
import pool from "../../../backend-utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import Encrypt from "../../../components/functions/encrypt";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            //the recipes data is held in three different databases, the recipes table, the recipe_instructions table, and the recipe_ingredients table.
            //this code will fetch data from these three tables then combine them to send to the front end 
            
            const { id } = req.query;
            
            // Validate and sanitize ID parameter
            const recipeId = parseInt(id as string, 10);
            if (isNaN(recipeId) || recipeId <= 0) {
                return res.status(400).json({ message: 'Invalid recipe ID' });
            }
            
            //get the data from the recipes table
            const recipesData = await pool.query('SELECT * FROM recipes WHERE recipe_id = $1', [recipeId]);  
            
            //get the data from the recipe_instructions table
            const instructionsResponse = await pool.query('SELECT instruction FROM recipe_instructions WHERE recipe_id = $1 ORDER BY instruction_order ASC', [recipeId]);  
            const instructions = instructionsResponse.rows.map( ({instruction}) => instruction);

            //get the data from the recipe_ingredients table
            const ingredientsResponse = await pool.query('SELECT ingredient FROM recipe_ingredients WHERE recipe_id = $1', [recipeId]);  
            const ingredients = ingredientsResponse.rows.map( ({ingredient}) => ingredient);

            //get the data from the recipe_ingredients table
            const commentsResponse = await pool.query('SELECT comment FROM recipesComments WHERE recipe_id = $1', [recipeId]);  
            const comments = commentsResponse.rows.map( ({comment}) => comment);

            //combine the data of the recipesData and instructions
            const combinedData = recipesData.rows.map(item => ({
                ...item,
                ingredients: ingredients,
                instructions: instructions,
                comments: comments
            }));
            
            res.status(200).json({ body: combinedData });
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the recipe and we could not complete your request. Error: "+ error});
        }
    } else if (method =='PUT') {
        try{

            const { id } = req.query;
            
            // Validate and sanitize ID parameter
            const recipeId = parseInt(id as string, 10);
            if (isNaN(recipeId) || recipeId <= 0) {
                return res.status(400).json({ message: 'Invalid recipe ID' });
            }

            const session = await getServerSession(req, res, authOptions);
            if (!session) { //return an error message if the user is unauthorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const user_encrypted = Encrypt(session.user.email);

            const {comment} = JSON.parse(req.body);
            
            // Validate comment
            if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
                return res.status(400).json({ message: 'Comment is required' });
            }
            
            // Sanitize comment (limit length)
            const sanitizedComment = comment.trim().substring(0, 1000);

            const recipesResponse = await pool.query(
                'INSERT INTO recipesComments(recipe_id, comment, user_encrypted) VALUES ($1, $2, $3)',
                [recipeId, sanitizedComment, user_encrypted]
            );

            res.status(200).json({message: recipesResponse});
        } catch(error){
            console.log("this is error");
            console.log(error);
            res.status(500).json({message: "There was an error while sending the comment. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the recipe request wasnt GET');
    }

}