export default async function FetchProfileRecipes(dataCallback, loadingCallback) {
    try{      
      const response = await fetch(`/api/recipes/profileRecipes`);
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