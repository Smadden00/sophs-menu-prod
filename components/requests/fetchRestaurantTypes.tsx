export default async function FetchRestaurantTypes(dataCallback, loadingCallback) {
    try {      
        const response = await fetch(`/api/restaurantTypes`);
        if (!response.ok) {
            throw new Error('Error in fetching restaurant types.');
        }
        const javascriptResponse = await response.json();
        const restaurantTypesData = javascriptResponse.body;
        dataCallback(restaurantTypesData);
        if (loadingCallback) {
            loadingCallback(false);
        }
    } catch (error) {
        if (loadingCallback) {
            loadingCallback(false);
        }
        console.error('Error fetching restaurant types: ', error);
    }
};
