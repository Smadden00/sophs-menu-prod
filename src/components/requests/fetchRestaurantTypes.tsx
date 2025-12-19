export default async function FetchRestaurantTypes(dataCallback: (data: any[]) => void, loadingCallback: (loading: boolean) => void) {
    try {      
        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/restaurant-types/`);
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
