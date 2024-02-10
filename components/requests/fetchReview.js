export default async function FetchReview(id, dataCallback, loadingCallback) {
    try {
        const response = await fetch(`/api/reviews/${id}`);
        if (!response.ok) {
            throw new Error('Error while fetching the review data.');
        }
        const {body: [reviewData]} = await response.json();
        //if there are no errors, send the user to the reviews page
        dataCallback(reviewData);
        loadingCallback(false)
    } catch (error) {
        console.log('caught an error while fetching the review data');
        console.error('Error:', error);    
    }
};
