import styles from "./Reviews.module.css";
import Header from "../../components/header";
import ReviewCard from "../../components/reviewCard";
import { Key, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FetchAllReviews from "../../components/requests/fetchAllReviews";
import FiltersButton from "../../components/filters/filtersButton";
import AddClipboardIcon from "../../components/svgs/addClipboardIcon";
import QuickSort from "../../components/functions/quickSort";
import SortButton from "../../components/SortButton";
import { Review } from "../../types/index"

export default function ReviewsListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [lowerRatingVal, setLowerRatingVal] = useState(0);
  const [upperRatingVal, setUpperRatingVal] = useState(10);
  const [lowerPriceVal, setLowerPriceVal] = useState(0);
  const [upperPriceVal, setUpperPriceVal] = useState(4);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [sophSubmittedOnly, setSophSubmittedOnly] = useState(searchParams.get('sophOnly') === 'true');
  const [sortBy, setSortBy] = useState<[string, string]>(["Rating", "High to Low"]);
  
  //create an object with all of the filters and filter callbacks so that it is easier to pass down 
  const filterValuesAndCallbacks = {
    lowerRatingVal: lowerRatingVal, 
    setLowerRatingVal: setLowerRatingVal, 
    upperRatingVal: upperRatingVal, 
    setUpperRatingVal: setUpperRatingVal, 
    lowerPriceVal: lowerPriceVal, 
    setLowerPriceVal: setLowerPriceVal, 
    upperPriceVal: upperPriceVal, 
    setUpperPriceVal: setUpperPriceVal,
    selectedStates: selectedStates,
    setSelectedStates: setSelectedStates,
    sophSubmittedOnly: sophSubmittedOnly,
    setSophSubmittedOnly: setSophSubmittedOnly
  };

  //Load in all the data
  useEffect(() => {
    FetchAllReviews(setReviewsData, setLoading);
  },[]);

  //filter out reviews based on filters
  const filteredReviews = reviewsData.filter((review) => {
    const stateMatch = selectedStates.length === 0 || selectedStates.includes(review.state_code);
    const sophSubmittedMatch = !sophSubmittedOnly || review.soph_submitted === true;
    
    if(
      Number(review.o_rating) >= lowerRatingVal && 
      Number(review.o_rating) <= upperRatingVal &&
      review.price >= lowerPriceVal &&
      review.price <= upperPriceVal &&
      stateMatch &&
      sophSubmittedMatch
    ){
      return review
    } 
    return false
  })

  const sortedFilteredReviews = QuickSort(filteredReviews, sortBy);

  //build the images of each review
  const reviewsImages = sortedFilteredReviews.map((reviewData: Review, i: Key ) => <ReviewCard title={reviewData.rest_name} rating={reviewData.o_rating} price={reviewData.price} id={reviewData.review_id} location={`${reviewData.city}, ${reviewData.state_code}`} restType={reviewData.rest_type || 'Not specified'} key={i} />);

  return (
    <>
    <Header />
    <div className={styles.reviewsContainer}>
      <div className={styles.topRow}>
        <div className={styles.addContainer}>
          <div 
            className={styles.addButton} 
            onClick={() => navigate('/reviews/addReview')}
          >
            <p>Add Review</p>
            <AddClipboardIcon />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Reviews</h1>
        </div>
        <div className={styles.sortFilterContainer}>
          <FiltersButton filterValuesAndCallbacks={filterValuesAndCallbacks} isReview={true}/>
          <SortButton sortBy={sortBy} setSortBy={setSortBy} isReview={true} />
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? <h1>LOADING</h1> : reviewsImages}
      </div>
    </div>

    </>
)}


