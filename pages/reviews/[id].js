import Header from "../../components/header";
import { useState, useEffect } from "react";
import styles from "./Review.module.css";
import { useRouter } from "next/router";
import BuildPriceSigns from "../../components/functions/buildPriceSigns";
import ReviewGraph from "../../components/reviewGraph"
import FetchReview from "../../components/requests/fetchReview";

export default function Review() {
    const router = useRouter();
    const { id } = router.query

    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);

    const {rest_name, description, experience, o_rating, price, taste, city, state_code} = reviewData

    //Fetch the review data
    useEffect(() => {
        FetchReview(id, setReviewData, setLoading);
    }, []);

    if (loading){
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>LOADING</h1>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>{rest_name}</h1>
                        <div className={styles.subTitleContainer}>
                            <p>{city}, {state_code}</p>
                            <p>{BuildPriceSigns(price)}</p>
                            <p>Cuisines</p>
                        </div>
                    </div>
                    <div className={styles.reviewSectionContainer}>
                        <h1>Average of Reviews</h1>
                        <div className={styles.reviewChartContainer}>
                            <ReviewGraph o_rating={o_rating} experience={experience} taste={taste} />
                        </div>
                    </div>
                    <div className={styles.reviewSectionContainer}>
                        <h1>Descriptions</h1>
                        <p>Description: {description}</p>
                    </div>
                </div>
            </>
        )    
    }
}