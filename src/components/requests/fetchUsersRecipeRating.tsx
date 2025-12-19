export default async function FetchUsersRecipeRating(recipeid, usersRatingCallback, loadingCallback) {
    try {
        const response = await fetch(`/api/recipes/${recipeid}/rating`);
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
