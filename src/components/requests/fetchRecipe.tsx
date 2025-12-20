import { Recipe } from "../../types/index";

interface FetchRecipeProps {
    recipeId: number;
    dataCallback: (data: Recipe) => void;
    loadingCallback: (loading: boolean) => void;
}

export default async function FetchRecipe({ recipeId, dataCallback, loadingCallback }: FetchRecipeProps) {
    try {
        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/recipes/${recipeId}`);
        if (!response.ok) {
            throw new Error('Error while fetching the recipe data.');
        }
        const {body: [recipeData]} = await response.json();
        //if there are no errors, send the user to the recipes page

        dataCallback(recipeData);
        loadingCallback(false)
    } catch (error) {
        console.log('caught an error while fetching the recipe data');
        console.error('Error:', error);   
        loadingCallback(false);
    }
};
