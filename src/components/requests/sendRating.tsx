import Encrypt from "../functions/encrypt";
import { Dispatch, SetStateAction } from "react";
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

interface SendRatingProps {
    recipeId: number;
    rating: number;
    ratingCallback: Dispatch<SetStateAction<number>>;
    setMessage: Dispatch<SetStateAction<string>>;
    userAuthData: Auth0ContextInterface<User>;
}

export default async function SendRating({recipeId, rating, ratingCallback, setMessage, userAuthData}: SendRatingProps) {

    const { user } = userAuthData;

    try {
        if(user && user.email){
            const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/${recipeId}/rating/${user.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipeId, rating })
            });
                
            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            const responseData = await response.json();
            
            ratingCallback(rating);
            setMessage(responseData.message || 'Rating submitted successfully');

            return responseData;
        }
    } catch (error) {
        console.error('Error sending the new comment:', error);    
    }
};