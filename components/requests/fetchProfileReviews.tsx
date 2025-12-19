export default async function FetchProfileReviews(dataCallback, loadingCallback) {
    try{      
      const response = await fetch(`/api/reviews/profileReviews`);
      if (!response.ok) {
        throw new Error('Error in fetching profile reviews.');
      }
      const javascriptResponse = await response.json();
      const profileRestaurantReviewsData = javascriptResponse.body;
      dataCallback(profileRestaurantReviewsData);
      loadingCallback(false);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
    }
};