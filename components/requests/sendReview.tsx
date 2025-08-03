import SendReviewSafetyChecks from "../safetyChecks/sendReviewSafetyChecks";
import AddSingleQuoteInFrontOfSingleQuote from "../functions/addSingleQuoteInFrontOfSingleQuote";

export default async function SendReview(router, restaurantName, restaurantType, overallRating, price, taste, experience, description, state, city, setInputError) {
        try { 
            const safetyResponse = SendReviewSafetyChecks(restaurantName, restaurantType, overallRating, price, taste, experience, description, city);
            if (safetyResponse.isError){
                setInputError(safetyResponse);
                throw new Error(safetyResponse.message);
            }

            const restaurantNameWithSingleQuotesEscaped = AddSingleQuoteInFrontOfSingleQuote(restaurantName);
            const descriptionWithSingleQuotesEscaped = AddSingleQuoteInFrontOfSingleQuote(description);
            
            const response = await fetch('/api/reviews', {
                method: 'PUT',
                body: JSON.stringify({
                    rest_name: restaurantNameWithSingleQuotesEscaped,
                    rest_type: restaurantType,
                    o_rating: overallRating, 
                    price: price, 
                    taste: taste, 
                    experience: experience, 
                    description: descriptionWithSingleQuotesEscaped, 
                    city: city,
                    state_code: state,
                    soph_submitted: false
                })
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                console.log("in send review error")
                throw new Error('Could not make put request.');
            }

            //if there are no errors, send the user back to the reviews page
            router.push('/reviews');
        } catch (error) {
            console.error(`Error in one of the fields: ${error}.`);    
        }
    };