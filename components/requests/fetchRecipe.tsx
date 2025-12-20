import type { Recipe } from "../../types";

export default async function FetchRecipe(
    id: number, 
    dataCallback: (data: Recipe) => void, 
    loadingCallback: (loading: boolean) => void
) {
    try {
        const response = await fetch(`/api/recipes/${id}`);
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
    }
};
