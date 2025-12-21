import { Recipe } from "../../types/index"
import { Dispatch, SetStateAction } from "react";

interface FetchProfileRecipesProps {
  dataCallback: Dispatch<SetStateAction<Recipe[]>>;
  loadingCallback: Dispatch<SetStateAction<boolean>>;
  getAccessTokenSilently: () => Promise<string>;
}

export default async function FetchProfileRecipes({ dataCallback, loadingCallback, getAccessTokenSilently }: FetchProfileRecipesProps) {
  
  try{      
    const token = await getAccessTokenSilently();

    const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/profile-recipes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
      throw new Error('Error in fetching profile recipes.');
    }
    const javascriptResponse = await response.json();
    const profileRecipesData = javascriptResponse.body;
    dataCallback(profileRecipesData);
    loadingCallback(false);
  } catch (error) {
    console.error('Error fetching profile recipes: ', error);
  }
};