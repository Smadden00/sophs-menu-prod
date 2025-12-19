export default async function FetchRatedRecipes(dataCallback, loadingCallback) {
    try{      
      const response = await fetch(`/api/recipes/ratedRecipes`);
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
