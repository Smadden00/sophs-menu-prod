export default async function FetchReview(id: number, dataCallback: (data: any) => void, loadingCallback: (loading: boolean) => void) {
    try {
        const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/reviews/${id}`);
        if (!response.ok) {
            throw new Error('Error while fetching the review data.');
        }
        const {body: [reviewData]} = await response.json();
        //if there are no errors, send the user to the reviews page
        dataCallback(reviewData);
        loadingCallback(false)
    } catch (error) {
        console.error('Error:', error);    
    }
};
