export default async function FetchAllReviews(dataCallback, loadingCallback) {
        try{
          const response = await fetch('/api/reviews');
          if (!response.ok) {
            throw new Error('Error in fetching all reviews.');
          }
          const javascriptResponse = await response.json();
          const reviewsData = javascriptResponse.body.rows;
          dataCallback(reviewsData);
          loadingCallback(false);
        } catch (error) {
          console.error('Error fetching reviews: ', error);
        }
};