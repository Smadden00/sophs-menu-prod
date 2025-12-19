import Encrypt from "../functions/encrypt";

export default async function SendRating(recipeId, rating, ratingCallback, setMessage) {

    try {
            //use safety checks function
            if (false){
                throw new Error("Error in the data input");
            }
                
            const response = await fetch(`/api/recipes/${recipeId}/rating`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId, rating }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            const responseData = await response.json();
            
            ratingCallback(rating);
            setMessage(responseData.message || 'Rating submitted successfully');

            return responseData;

        } catch (error) {
            console.error('Error sending the new comment:', error);    
        }
    };