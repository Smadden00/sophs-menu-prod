import SendRecipeSafetyChecks from "../safetyChecks/sendRecipeSafetyChecks";
import AddSingleQuoteInFrontOfSingleQuote from "../functions/addSingleQuoteInFrontOfSingleQuote";

export default async function SendRecipe(router, recipeName, ingredients, prepTime, rating, meal, instructions, imageFile, setUploading, setInputError) {

    try {
            const safetyResponse = SendRecipeSafetyChecks(recipeName, ingredients, prepTime, rating, meal, instructions)
            if (safetyResponse.isError){
                setInputError(safetyResponse);
                throw new Error(safetyResponse.message);
            }

            setUploading(true);

            const recipeNameWithSingleQuotesEscaped = AddSingleQuoteInFrontOfSingleQuote(recipeName);
            const instructionsWithSingleQuotesEscaped = instructions.map((instruction) => AddSingleQuoteInFrontOfSingleQuote(instruction));
            const ingredientsWithSingleQuotesEscaped = ingredients.map((ingredient) => AddSingleQuoteInFrontOfSingleQuote(ingredient));


            //construct the form to send to the api endpoint
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                recipe_name: recipeNameWithSingleQuotesEscaped,
                ingredients: ingredientsWithSingleQuotesEscaped, 
                prep_time: prepTime, 
                rating: rating, 
                meal: meal, 
                instructions: instructionsWithSingleQuotesEscaped
            }));
            formData.append('imageFile', imageFile);
            
            const response = await fetch('/api/recipes', {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                console.log("in send recipe error")
                throw new Error('Could not make recipe put request.');
            }

            console.log("this is response.json in send recipe");
            console.log(response.json);
            //if there are no errors, send the user back to the reviews page
            router.push('/recipes');

            return response.json();

        } catch (error) {
            console.error(`Error in one of the fields: ${error}.`);    
        }
    };