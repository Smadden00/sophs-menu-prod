import { Review } from "../../types/index"
import { Dispatch, SetStateAction } from "react";

interface FetchProfileReviewsProps {
  dataCallback: Dispatch<SetStateAction<Review[]>>;
  loadingCallback: Dispatch<SetStateAction<boolean>>;
  userEmail: string;
  getAccessTokenSilently: () => Promise<string>;
}

export default async function FetchProfileReviews({ dataCallback, loadingCallback, userEmail, getAccessTokenSilently }: FetchProfileReviewsProps) {
    try{      
      const token = await getAccessTokenSilently();

      const response = await fetch(`https://sophsdatabasedomain.duckdns.org/api/reviews/profile-reviews/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
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