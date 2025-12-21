import { Dispatch, SetStateAction } from 'react'
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

interface SendCommentProps {
    recipeId: number;
    usersComment: string;
    commentCallback: Dispatch<SetStateAction<string>>;
    recipeData: any//??????
    recipeDataCallback: Dispatch<SetStateAction<any>>;
    userAuthData: Auth0ContextInterface<User>;
    getAccessTokenSilently: () => Promise<string>;
}

export default async function SendComment({recipeId, usersComment, commentCallback, recipeData, recipeDataCallback, userAuthData, getAccessTokenSilently}: SendCommentProps) {

    const {user} = userAuthData;

    try {

        const token = await getAccessTokenSilently();
        
        if(user && user.email){        
            const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/${recipeId}/${user.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment: usersComment })
            });

            if (!response.ok) {
                throw new Error('Could not make recipe put request.');
            }
            
            commentCallback('');
            recipeDataCallback({...recipeData, comments: [...recipeData.comments, usersComment]});

            return response.json();

        } else {
            throw new Error("User email not defined.")
        }
    } catch (error) {
            console.error('Error sending the new comment:', error);    
        }
    };