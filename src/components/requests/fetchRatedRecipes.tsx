import { RecipeRating } from "../../types/index"
import { Dispatch, SetStateAction } from "react";

interface FetchRatedRecipesProps {
  dataCallback: Dispatch<SetStateAction<RecipeRating[]>>;
  loadingCallback: Dispatch<SetStateAction<boolean>>;
  userEmail: string;
  getAccessTokenSilently: () => Promise<string>;
}

export default async function FetchRatedRecipes({ dataCallback, loadingCallback, userEmail, getAccessTokenSilently }: FetchRatedRecipesProps) {
    try{      

      const token = await getAccessTokenSilently();

      const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/rated-recipes/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
      if (!response.ok) {
        throw new Error('Error in fetching rated recipes.');
      }
      const javascriptResponse = await response.json();
      const ratedRecipesData = javascriptResponse.body;
      dataCallback(ratedRecipesData);
      loadingCallback(false);
    } catch (error) {
      console.error('Error fetching rated recipes: ', error);
    }
};
