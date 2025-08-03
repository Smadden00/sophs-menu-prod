import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './RecipeRating.module.css';
import SendRating from '../../components/requests/sendRating';
import FetchUsersRecipeRating from '../requests/fetchUsersRecipeRating';

interface RecipeRatingProps {
  recipeId: number | string;
  currentAverageRating?: number;
  userRating?: number;
  onRatingSubmitted?: () => void;
}

export default function RecipeRating({recipeId, userRating = 0 }: RecipeRatingProps) {
    const { data: session } = useSession();

    const [previouslySelectedRating, setPreviouslySelectedRating] = useState(0);
    const [message, setMessage] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isUsersRatingLoading, setIsUsersRatingLoading] = useState(true);

    useEffect(() => {
        if (session) {
            // Fetch the user's rating for the recipe
            FetchUsersRecipeRating(recipeId, setPreviouslySelectedRating, setIsUsersRatingLoading);
        }
    }, []);

    const getStarClass = (starNumber: number) => {
        const baseClass = `${styles.star} `;
        const displayRating = hoveredRating || previouslySelectedRating;
        
        if (starNumber <= displayRating) {
        return `${baseClass} ${styles.filled}`;
        } else {
        return `${baseClass} ${styles.empty}`;
        }
    };

    //if the user is logged in
    if(session) {
        //if the users rating is still loading
        if (isUsersRatingLoading){
            return (
                <div className={styles.ratingContainer}>
                    <div className={styles.userRating}>
                        <h4>Recipe rating loading:</h4>
                        <div className={styles.starRating} onMouseLeave={() => setHoveredRating(0)}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                key={star}
                                className={getStarClass(star)}
                                >★</span>
                            ))}
                            <span className={styles.ratingText}>
                                0/5
                            </span>
                        </div>
                    </div>
                    {message && (
                        <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                            {message}
                        </p>
                    )}
                </div>
            );
        } else if (!isUsersRatingLoading && previouslySelectedRating > 0) { //user has rated the recipe
            return (
                <div className={styles.ratingContainer}>
                    <div className={styles.userRating}>
                        <h4>You rated this recipe:</h4>
                        <div className={styles.starRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                key={star}
                                className={getStarClass(star)}
                                >★</span>
                            ))}
                            <span className={styles.ratingText}>
                                {previouslySelectedRating}/5
                            </span>
                        </div>
                    </div>
                    {message && (
                        <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                            {message}
                        </p>
                    )}
                </div>
            )
        } else { //the user has not rated the recipe yet
            return (
                <div className={styles.ratingContainer}>
                    <div className={styles.userRating}>
                    <h4>Rate this recipe:</h4>
                    <div className={styles.starRating} onMouseLeave={() => setHoveredRating(0)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                            key={star}
                            className={getStarClass(star)}
                            onClick={() => SendRating(recipeId, star, setPreviouslySelectedRating, setMessage)}
                            onMouseEnter={() => setHoveredRating(star)}
                            style={{ cursor: 'pointer' }}
                            >★</span>
                        ))}
                        <span className={styles.ratingText}>
                            {hoveredRating > 0 ? hoveredRating : previouslySelectedRating}/5
                        </span>
                    </div>
                    {userRating > 0 && (
                        <p className={styles.currentRatingText}>
                        Your current rating: {previouslySelectedRating}/5
                        </p>
                    )}
                    </div>
                    {message && (
                        <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                            {message}
                        </p>
                    )}
                </div>
            );
        }
    } else { //the user is not logged in
            return (
                <div className={styles.ratingContainer}>
                    <div className={styles.userRating}>
                        <h4>Please log in to rate this recipe</h4>
                        <div className={styles.starRating} onMouseLeave={() => setHoveredRating(0)}>
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
                    {message && (
                        <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                            {message}
                        </p>
                    )}
                </div>
            );
        }

}
