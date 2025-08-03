/*
This function will handle the get all recipes and put recipe calls
*/
import pool from '../../../backend-utils';
import Encrypt from '../../../components/functions/encrypt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import UploadPhoto from '../../../components/requests/uploadPhoto';
import formidable from 'formidable';


export const config = {
    api: {
      bodyParser: false, // Disable the default bodyParser
    },
  };

export default async function handler(req, res){
    const method = req.method;
    if (method == 'GET'){
        try{
            const client = await pool.connect()
            const data = await client.query('SELECT recipe_id, recipe_name, prep_time_in_min, rating, meal, rec_img_url FROM recipes;');
            res.status(200).json({ body: data });
        } catch (error) {
            res.status(500).json({message: 'There was an error and we could not complete your get all recipes request. Error: '+ error});
        }
    } else if (method == 'PUT'){
        const client = await pool.connect();
        try{

            console.log("1")

            //ensure the user is authorized to make a put request then encrypt the user identifier
            const session = await getServerSession(req, res, authOptions);
            if (!session) { //return an error message if the user is unauthorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const user_encrypted = Encrypt(session.user.email);

            console.log("2")

            //parse the form data with formidable
            const form = formidable({});
            const [fields, files] = await form.parse(req);
            
            console.log("3")

            //Insert the data into the database and return the recipe_id
            const {recipe_name, ingredients, prep_time, rating, meal, instructions} = JSON.parse(fields.data[0]);
            
            console.log("Fields: ", fields.data[0]);

            console.log("4")

            // Input validation
            if (!recipe_name || !ingredients || !instructions || !meal) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            console.log("5")
            
            if (isNaN(prep_time) || prep_time < 0 || isNaN(rating) || rating <= 0 || rating > 10) {
                return res.status(400).json({ message: 'Invalid prep_time or rating values' });
            }

            console.log("6")

            // Start transaction
            await client.query('BEGIN');
            
            // Sanitize inputs
            const sanitizedRecipeName = recipe_name.trim().substring(0, 255);
            const sanitizedMeal = meal.trim().substring(0, 50);
            
            const recipesResponse = await client.query(
                'INSERT INTO recipes(recipe_name, prep_time_in_min, rating, meal, user_encrypted) VALUES ($1, $2, $3, $4, $5) RETURNING recipe_id',
                [sanitizedRecipeName, prep_time, rating, sanitizedMeal, user_encrypted]
            );
            const [{recipe_id}] = recipesResponse.rows
            
            console.log("7")

            //Insert the instructions into the database. I create separate SQL inserts for each instruction by creating a long string, then insert them all in one command
            const instructionPromises = instructions.map((instruction, i) => {
                const sanitizedInstruction = instruction.trim().substring(0, 1000);
                return client.query(
                    'INSERT INTO recipe_instructions(recipe_id, instruction_order, instruction) VALUES ($1, $2, $3)',
                    [recipe_id, i, sanitizedInstruction]
                );
            });
            await Promise.all(instructionPromises);

            console.log("8")

            //Here, I build the value portion of the ingredients SQL put query (as a string) that will go into the database
            const ingredientPromises = ingredients.map((ingredient) => {
                const sanitizedIngredient = ingredient.trim().substring(0, 255);
                return client.query(
                    'INSERT INTO recipe_ingredients(recipe_id, ingredient) VALUES ($1, $2)',
                    [recipe_id, sanitizedIngredient]
                );
            });
            await Promise.all(ingredientPromises);

            console.log("9")

            //Upload the image file to an S3 bucket before committing the transaction
            const uploadPhotoResponse = await UploadPhoto(files, `${recipe_id}`);
            if (uploadPhotoResponse.err && uploadPhotoResponse.status==='Failure'){
                console.log('S3Response: ')
                console.log(uploadPhotoResponse.response)
                throw new Error(uploadPhotoResponse.err);
            }
            
            // Save the image URL to the database
            const s3Bucket = "sophs-menu-imgs";
            const s3Region = "us-east-1";
            const imageUrl = `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/${recipe_id}`;
            await client.query(
                'UPDATE recipes SET rec_img_url = $1 WHERE recipe_id = $2',
                [imageUrl, recipe_id]
            );
            
            console.log("10")

            // commit the transaction
            await client.query('COMMIT');

            res.status(200).json({message: "Recipe created successfully", recipe_id});
        } catch(err) {
            console.error('Recipe creation error:', err);
            // Rollback the transaction on any error
            await client.query('ROLLBACK');
            res.status(500).json({message: 'Failed to create recipe'})
        } finally {
            // release the client back to pool
            client.release();
        }
    }

}