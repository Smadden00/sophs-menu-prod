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
            const data = await client.query('SELECT recipe_id, recipe_name, prep_time_in_min, rating, meal FROM recipes;');
            res.status(200).json({ body: data });
        } catch (error) {
            res.status(500).json({message: 'There was an error and we could not complete your get all recipes request. Error: '+ error});
        }
    } else if (method == 'PUT'){
        try{

            //ensure the user is authorized to make a put request then encrypt the user identifier
            const session = await getServerSession(req, res, authOptions);
            if (!session) { //return an error message if the user is unauthorized
                return res.status(500).json({ message: 'The request was unauthorized' });
            }
            const user_encrypted = Encrypt(session.user.email);

            //parse the form data with formidable
            const form = formidable({});
            const [fields, files] = await form.parse(req);
            
            //Insert the data into the database and return the recipe_id
            const {recipe_name, ingredients, prep_time, rating, meal, instructions} = JSON.parse(fields.data);
            const recipesResponse = await pool.query(`INSERT INTO recipes(recipe_name, prep_time_in_min, rating, meal, user_encrypted) VALUES ('${recipe_name}', ${prep_time}, ${rating}, '${meal}', '${user_encrypted}') RETURNING recipe_id;`);
            const [{recipe_id}] = recipesResponse.rows
            
            //Upload the image file to an S3 bucket
            const uploadPhotoResponse = await UploadPhoto(files, `${recipe_id}`);
            if (uploadPhotoResponse.err && uploadPhotoResponse.status==='Failure'){
                console.log('S3Response: ')
                console.log(uploadPhotoResponse.response)
                throw new Error(uploadPhotoResponse.err);
            }

            //Insert the instructions into the database. I create separate SQL inserts for each instruction by creating a long string, then insert them all in one command
            let instructionsValues = ''
            instructions.forEach((instruction, i) => {
                if (i==0){
                    instructionsValues+=`(${recipe_id}, ${i}, '${instruction}')`
                } else {
                    instructionsValues+=`, (${recipe_id}, ${i}, '${instruction}')`
                }
            });
            const instructionsResponse = await pool.query(`INSERT INTO recipe_instructions(recipe_id, instruction_order, instruction) VALUES ${instructionsValues};`)

            //Here, I build the value portion of the ingredients SQL put query (as a string) that will go into the database
            let ingredientValues = ''
            ingredients.forEach((ingredient, i) => {
                if (i==0){
                    ingredientValues+=`(${recipe_id}, '${ingredient}')`
                } else {
                    ingredientValues+=`, (${recipe_id}, '${ingredient}')`
                }
            });
            const ingredientsResponse = await pool.query(`INSERT INTO recipe_ingredients(recipe_id, ingredient) VALUES ${ingredientValues};`)

            res.status(200).json({message: [uploadPhotoResponse, recipesResponse, instructionsResponse, ingredientsResponse]});
        } catch(err) {
            res.status(500).json({message: 'There was an error and we could not insert your recipe data.', })
        }
    }

}