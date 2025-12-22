import SendRecipeSafetyChecks from "../safetyChecks/sendRecipeSafetyChecks";
import AddSingleQuoteInFrontOfSingleQuote from "../functions/addSingleQuoteInFrontOfSingleQuote";
import FetchPresignedImgUploadEndpoint from "./fetchPresignedImgUploadEndpoint"
import { Dispatch, SetStateAction } from "react";
import { PresignedImgUploadResponse } from "../../types/index";

interface SendRecipeProps {
    navigate: (path: string) => void;
    recipeName: string;
    ingredients: string[];
    prepTime: number;
    meal: string;
    instructions: string[];
    imageFile: File;
    setUploading: Dispatch<SetStateAction<boolean>>;
    setInputError: Dispatch<SetStateAction<{ field: string; message: string; isError: boolean} | null>>;    
    getAccessTokenSilently: () => Promise<string>;
}

export default async function SendRecipe({navigate, recipeName, ingredients, prepTime, meal, instructions, imageFile, setUploading, setInputError, getAccessTokenSilently}: SendRecipeProps) {

    let imgUploadUrl: string;
    let imgPublicUrl: string;
    let recipeNameWithSingleQuotesEscaped: string;
    let instructionsWithSingleQuotesEscaped: string[];
    let ingredientsWithSingleQuotesEscaped: string[];

    /******
    SAFETY CHECKS
    ******/
    try{
        const safetyResponse = SendRecipeSafetyChecks(recipeName, ingredients, prepTime, meal, instructions)
        if (safetyResponse.isError){
            setInputError(safetyResponse);
            throw new Error(safetyResponse.message);
        }

        recipeNameWithSingleQuotesEscaped = AddSingleQuoteInFrontOfSingleQuote(recipeName);
        instructionsWithSingleQuotesEscaped = instructions.map((instruction) => AddSingleQuoteInFrontOfSingleQuote(instruction));
        ingredientsWithSingleQuotesEscaped = ingredients.map((ingredient) => AddSingleQuoteInFrontOfSingleQuote(ingredient));
    } catch (error){
        console.error('Safety check failed:', error);
        return;
    }
    /******
    END SAFETY CHECKS
    ******/
    
    // Set uploading state before any async operations
    setUploading(true);
    
    try {
        /********************************
        GET PRESIGNED URL AND UPLOAD IMAGE TO S3
        ********************************/
        const presignedData: PresignedImgUploadResponse = await FetchPresignedImgUploadEndpoint({
            fileType: imageFile.type, 
            getAccessTokenSilently
        });
        
        imgUploadUrl = presignedData.imgUploadUrl;
        imgPublicUrl = presignedData.imgPublicUrl;

        const uploadImgRes = await fetch(imgUploadUrl, {
            method: "PUT",
            headers: {
                'Content-Type': imageFile.type,
            },
            body: imageFile,
        });

        if (!uploadImgRes.ok) {
            throw new Error(`Failed to upload image to S3: ${uploadImgRes.status} ${uploadImgRes.statusText}`);
        }
        /********************************
        END IMAGE UPLOAD
        ********************************/

        /*****************************************************
        UPLOAD THE RECIPE INFORMATION TO DATABASE
        *****************************************************/
        // Get token
        const token = await getAccessTokenSilently();

        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                recipe_name: recipeNameWithSingleQuotesEscaped,
                ingredients: ingredientsWithSingleQuotesEscaped, 
                prep_time: prepTime, 
                meal: meal, 
                instructions: instructionsWithSingleQuotesEscaped,
                img_public_url: imgPublicUrl,
                soph_submitted: false,
            })
        });
        /*****************************************************
        END RECIPE UPLOAD
        *****************************************************/


        /*********************
        START ERROR HANDLING
        *********************/
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

        /*********************
        END ERROR HANDLING
        *********************/

        //if there are no errors, reset loading state and navigate back to the recipes page
        setUploading(false);
        navigate('/recipes');

        return response.json();
        
    } catch (error){
        console.error('Error during recipe upload:', error);
        setUploading(false);
        setInputError({
            isError: true,
            message: 'Failed during upload. See console for more details',
            field: "unknown"
        });
    }
}