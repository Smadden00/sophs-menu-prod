import { Dispatch, SetStateAction } from "react";
import { RecipeRating } from "../../types/index";

interface FetchUsersRecipeRatingProps {
    recipeid: number;
    usersRatingCallback: Dispatch<SetStateAction<RecipeRating[]>>;
    loadingCallback: Dispatch<SetStateAction<boolean>>;
    userEmail: string;
}

export default async function FetchUsersRecipeRating({recipeid, usersRatingCallback, loadingCallback, userEmail}: FetchUsersRecipeRatingProps) {
    try {
        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/${recipeid}/rating/${userEmail}`);
        if (!response.ok) {
            throw new Error('Error while fetching the users rating data.');
        }
        const {usersRating} = await response.json();
        console.log("THIS IS USERS RATING:")
        console.log(usersRating)
        //if there are no errors, send the user to the reviews page
        usersRatingCallback(usersRating);
        loadingCallback(false)
    } catch (error) {
        console.error('Error:', error);
        loadingCallback(false);
    }
};
