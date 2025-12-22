import { Dispatch, SetStateAction } from "react";
import { RecipeRating } from "../../types/index";

interface FetchUsersRecipeRatingProps {
    recipeid: number;
    usersRatingCallback: Dispatch<SetStateAction<RecipeRating[]>>;
    loadingCallback: Dispatch<SetStateAction<boolean>>;
    getAccessTokenSilently: () => Promise<string>;
}

export default async function FetchUsersRecipeRating({recipeid, usersRatingCallback, loadingCallback, getAccessTokenSilently}: FetchUsersRecipeRatingProps) {
    try {
        const token = await getAccessTokenSilently();

        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/${recipeid}/rating/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
        if (!response.ok) {
            throw new Error('Error while fetching the users rating data.');
        }
        const {usersRating} = await response.json();
        //if there are no errors, send the user to the reviews page
        usersRatingCallback(usersRating);
        loadingCallback(false)
    } catch (error) {
        console.error('Error:', error);
        loadingCallback(false);
    }
};
