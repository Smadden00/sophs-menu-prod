import { Dispatch, SetStateAction } from 'react'
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

interface SendCommentProps {
    recipeId: number;
    usersComment: string;
    commentCallback: Dispatch<SetStateAction<string>>;
    recipeData: any//??????
    recipeDataCallback: Dispatch<SetStateAction<any>>;
    getAccessTokenSilently: () => Promise<string>;
}

export default async function SendComment({recipeId, usersComment, commentCallback, recipeData, recipeDataCallback, getAccessTokenSilently}: SendCommentProps) {

    try {

        const token = await getAccessTokenSilently();
        
        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/${recipeId}`, {
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
    } catch (error) {
            console.error('Error sending the new comment:', error);    
        }
    };