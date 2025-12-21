import styles from './addAComment.module.css'
import SendComment from '../../requests/sendComment'
import { Dispatch, SetStateAction } from "react";
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react';

interface FetchUsersRecipeRatingProps {
    usersComment: string;
    setUsersComment: Dispatch<SetStateAction<string>>;
    recipeId: number;
    recipeData: any;//??????
    setRecipeData: Dispatch<SetStateAction<any>>;
}

export default function AddAComment({usersComment, setUsersComment, recipeId, recipeData, setRecipeData}: FetchUsersRecipeRatingProps) {

    const { getAccessTokenSilently } = useAuth0();

    return (
        <div className={styles.addCommentContainer}> 
            <input
                type="text"
                placeholder="Add a comment"
                className={styles.addComment}
                id="Comment input"
                value={usersComment}
                onChange={(e) => setUsersComment(e.target.value)}
            />
            <button onClick={() => SendComment({recipeId, usersComment, commentCallback: setUsersComment, recipeData, recipeDataCallback: setRecipeData, getAccessTokenSilently})}>
                Add Comment
            </button>
        </div>
    )
}
