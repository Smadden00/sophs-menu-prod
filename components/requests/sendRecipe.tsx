import SendRecipeSafetyChecks from "../safetyChecks/sendRecipeSafetyChecks";
import AddSingleQuoteInFrontOfSingleQuote from "../functions/addSingleQuoteInFrontOfSingleQuote";

export default async function SendRecipe(router, recipeName, ingredients, prepTime, meal, instructions, imageFile, setUploading, setInputError) {

    try {
            const safetyResponse = SendRecipeSafetyChecks(recipeName, ingredients, prepTime, meal, instructions)
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
                meal: meal, 
                instructions: instructionsWithSingleQuotesEscaped
            }));
            formData.append('imageFile', imageFile);
            
            const response = await fetch('/api/recipes', {
                method: 'PUT',
                body: formData
            });

            console.log(`Recipe upload response status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                // Get the error response text for better debugging
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    errorMessage += ` - ${errorData.message || 'Unknown server error'}`;
                    console.error('Server error response:', errorData);
                } catch (parseError) {
                    // If we can't parse the response as JSON, get it as text
                    try {
                        const errorText = await response.text();
                        errorMessage += ` - ${errorText}`;
                        console.error('Server error response (text):', errorText);
                    } catch (textError) {
                        console.error('Could not read error response:', textError);
                    }
                }
                throw new Error(errorMessage);
            }

            //if there are no errors, send the user back to the reviews page
            router.push('/recipes');

            return response.json();

        } catch (error) {
            console.error('=== Recipe Upload Error Details ===');
            console.error('Error type:', error.constructor.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            console.error('Recipe data:', {
                recipeName: recipeName,
                ingredientsCount: ingredients?.length,
                instructionsCount: instructions?.length,
                prepTime: prepTime,
                meal: meal,
                imageFileSize: imageFile?.size,
                imageFileType: imageFile?.type
            });
            console.error('=====================================');
            
            setUploading(false); // Reset uploading state on error
            
            // Provide more specific error messages based on error type
            let userErrorMessage = 'Failed to upload recipe. ';
            
            if (error.message.includes('HTTP 413') || error.message.includes('too large')) {
                userErrorMessage += 'The image file is too large. Please try with a smaller image.';
            } else if (error.message.includes('HTTP 400')) {
                userErrorMessage += 'There was an issue with the recipe data. Please check all fields.';
            } else if (error.message.includes('HTTP 401')) {
                userErrorMessage += 'You need to be logged in to upload recipes.';
            } else if (error.message.includes('HTTP 500')) {
                userErrorMessage += 'Server error occurred. Please try again later.';
            } else if (error.message.includes('fetch')) {
                userErrorMessage += 'Network connection issue. Please check your internet connection.';
            } else {
                userErrorMessage += 'An unexpected error occurred. Please try again.';
            }
            
            setInputError({ isError: true, message: userErrorMessage });
            
            throw error; // Re-throw to allow caller to handle
        }
    };