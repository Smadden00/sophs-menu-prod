import { Dispatch, SetStateAction } from "react";

interface FetchRestaurantTypesProps {
    dataCallback: Dispatch<SetStateAction<string[]>>;
    loadingCallback: Dispatch<SetStateAction<boolean>>;
    getAccessTokenSilently: () => Promise<string>;
}

export default async function FetchRestaurantTypes({ dataCallback, loadingCallback, getAccessTokenSilently }: FetchRestaurantTypesProps) {
    try {      

        const token = await getAccessTokenSilently();

        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/restaurant-types/`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
         });
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
