import SendReviewSafetyChecks from "../safetyChecks/sendReviewSafetyChecks";
import AddSingleQuoteInFrontOfSingleQuote from "../functions/addSingleQuoteInFrontOfSingleQuote";
import { NavigateFunction } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { User } from "@auth0/auth0-react";

interface SendReviewProps {
    navigate: NavigateFunction;
    restaurantName: string;
    restaurantType: string;
    overallRating: number;
    price: number;
    taste: number;
    experience: number;
    description: string;
    state: string;
    city: string;
    setInputError: Dispatch<SetStateAction<{ field?: string; message: string; isError: boolean } | null>>;
    getAccessTokenSilently: () => Promise<string>;
}

export default async function SendReview({ navigate, restaurantName, restaurantType, overallRating, price, taste, experience, description, state, city, setInputError, getAccessTokenSilently }: SendReviewProps) {
        
    try { 

        const token = await getAccessTokenSilently();

        const safetyResponse = SendReviewSafetyChecks(restaurantName, restaurantType, overallRating, price, taste, experience, description, city);
        if (safetyResponse.isError){
            setInputError(safetyResponse);
            throw new Error(safetyResponse.message);
        }

        const restaurantNameWithSingleQuotesEscaped = AddSingleQuoteInFrontOfSingleQuote(restaurantName);
        const descriptionWithSingleQuotesEscaped = AddSingleQuoteInFrontOfSingleQuote(description);
        
        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/reviews`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
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
        navigate('/reviews');
    } catch (error) {
        console.error(`Error in one of the fields: ${error}.`);    
    }
    };