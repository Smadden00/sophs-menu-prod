import styles from "./Reviews.module.css";
import Header from "../../components/header";
import ReviewCard from "../../components/reviewCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import FetchAllReviews from "../../components/requests/fetchAllReviews";
import FiltersButton from "../../components/filters/filtersButton";
import AddClipboardIcon from "../../components/svgs/addClipboardIcon";
import QuickSort from "../../components/functions/quickSort";
import SeparateSortBy from "../../components/functions/separateSortBy";

export default function AddReview() {
  const router = useRouter();
  const [reviewsData, setReviewsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [lowerRatingVal, setLowerRatingVal] = useState(0);
  const [upperRatingVal, setUpperRatingVal] = useState(10);
  const [lowerPriceVal, setLowerPriceVal] = useState(0);
  const [upperPriceVal, setUpperPriceVal] = useState(4);
  const [sortBy, setSortBy] = useState(["Rating", "High to Low"]);
  
  //create an object with all of the filters and filter callbacks so that it is easier to pass down 
  const filterValuesAndCallbacks = {
    lowerRatingVal: lowerRatingVal, 
    setLowerRatingVal: setLowerRatingVal, 
    upperRatingVal: upperRatingVal, 
    setUpperRatingVal: setUpperRatingVal, 
    lowerPriceVal: lowerPriceVal, 
    setLowerPriceVal: setLowerPriceVal, 
    upperPriceVal: upperPriceVal, 
    setUpperPriceVal: setUpperPriceVal
  };

  //Load in all the data
  useEffect(() => {
    FetchAllReviews(setReviewsData, setLoading);
  },[]);

  //filter out reviews based on filters
  const filteredReviews = reviewsData.filter((review) => {
    if(
      review.o_rating >= lowerRatingVal && 
      review.o_rating <= upperRatingVal &&
      review.price >= lowerPriceVal &&
      review.price <= upperPriceVal
    ){
      return review
    } 
    return false
  })

  const sortedFilteredReviews = QuickSort(filteredReviews, sortBy);

  //build the images of each review
  const reviewsImages = sortedFilteredReviews.map((reviewData, i) => <ReviewCard title={reviewData.rest_name} rating={reviewData.o_rating} price={reviewData.price} id={reviewData.review_id} key={i} />);


  return (
    <>
    <Header />
    <div className={styles.reviewsContainer}>
      <div className={styles.topRow}>
        <div className={styles.addContainer}>
          <div 
            className={styles.addButton} 
            onClick={() => router.push('reviews/addReview')}
          >
            <h2>Add Review</h2>
            <AddClipboardIcon />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Reviews</h1>
        </div>
        <div className={styles.sortFilterContainer}>
          <div className={styles.sortContainer}>
            <select className={styles.stateDropdown} id="sort-dropdown" value={sortBy[0] + ", " + sortBy[1]} onChange={(e)=>setSortBy(SeparateSortBy(e.target.value))}>
              <option key="RatingHigh" value="Rating, High to Low">Rating, High to Low</option>
              <option key="RatingLow" value="Rating, Low to High">Rating, Low to High</option>
              <option key="PriceHigh" value="Price, High to Low">Price, High to Low</option>
              <option key="PriceLow" value="Price, Low to High">Price, Low to High</option>
            </select>
          </div>
          <FiltersButton filterValuesAndCallbacks={filterValuesAndCallbacks} isReview={true}/>
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? <h1>LOADING</h1> : reviewsImages}
      </div>
    </div>

    </>
)}


