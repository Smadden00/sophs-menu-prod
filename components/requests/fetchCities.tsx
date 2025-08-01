export default async function FetchCities(state, citiesCallback, citiesLoadingCallback) {
    try {
        const response = await fetch(`/api/cities/${state}`);
        if (!response.ok) {
            throw new Error('Error while fetching the cities data.');
        }
        const {body: citiesResponseData} = await response.json();
        const cities = citiesResponseData.map(({city})=>city);
        citiesCallback(cities);
        citiesLoadingCallback(false);
    } catch (error) {
        console.log('caught an error while fetching the cities data');
        console.error('Error:', error);    
    }
};
