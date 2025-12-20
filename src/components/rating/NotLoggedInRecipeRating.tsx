import styles from './RecipeRating.module.css';

export default function NotLoggedInRecipeRating() {

            return (
                <div className={styles.ratingContainer}>
                    <div className={styles.userRating}>
                        <h4>Please log in to rate this recipe and leave comments</h4>
                        <div className={styles.starRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                key={star}
                                className={`${styles.empty}`}
                                >★</span>
                            ))}
                            <span className={styles.ratingText}>
                                0/5
                            </span>
                        </div>
                    </div>
                </div>
            );
        }