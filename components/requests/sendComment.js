export default async function SendComment(recipeId, comment, commentCallback, recipeData, recipeDataCallback) {

    try {
            //use safety checks function
            if (false){
                throw new Error("Error in the data input");
            }
                
            const response = await fetch(`/api/recipes/${recipeId}`, {
                method: 'PUT',
                body: JSON.stringify({ comment: comment })
            });

            if (!response.ok) {
                console.log("in send comment error")
                throw new Error('Could not make recipe put request.');
            }
            
            commentCallback('');
            recipeDataCallback({...recipeData, comments: [...recipeData.comments, comment]});

            return response.json();

        } catch (error) {
            console.error('Error sending the new comment:', error);    
        }
    };