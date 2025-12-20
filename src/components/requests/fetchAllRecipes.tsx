import { Recipe } from "../../types/index"


export default async function FetchAllRecipes(dataCallback: (data: Recipe[]) => void, loadingCallback: (loading: boolean) => void) {
    try{
      const response = await fetch('https://sophsdatabasedomain.duckdns.org/api/recipes/');
      
      if (!response.ok) {
        throw new Error('Error in fetching all recipes.');
      }

      const javascriptResponse = await response.json();
      const reviewsData = javascriptResponse.body.rows;
      dataCallback(reviewsData);
      loadingCallback(false);

    } catch (error) {
      console.error('Error fetching reviews: ', error);
    }
};