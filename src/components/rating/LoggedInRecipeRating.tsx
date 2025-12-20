import React, { useState, useEffect } from 'react';
// TODO: Replace with auth solution
import styles from './RecipeRating.module.css';
import SendRating from '../../components/requests/sendRating';
import FetchUsersRecipeRating from '../requests/fetchUsersRecipeRating';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

interface LoggedInRecipeRatingProps {
  recipeId: number;
  currentAverageRating?: number;
  userRating?: number;
  onRatingSubmitted?: () => void;
  userAuthData: Auth0ContextInterface<User>;
}

export default function LoggedInRecipeRating({recipeId, userRating = 0 , userAuthData}: LoggedInRecipeRatingProps) {

    const { user, isAuthenticated, isLoading } = userAuthData;

    //FIX THE ANY BELOW 
    const [previouslySelectedRating, setPreviouslySelectedRating] = useState<any>(0);
    const [message, setMessage] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isUsersRatingLoading, setIsUsersRatingLoading] = useState(true);

    useEffect(() => {
        // Fetch the user's rating for the recipe
        if (isAuthenticated && user && user.email) {
            FetchUsersRecipeRating({recipeid: recipeId, usersRatingCallback: setPreviouslySelectedRating, loadingCallback: setIsUsersRatingLoading, userEmail: user.email});
        }
    }, [isAuthenticated]);

    const getStarClass = (starNumber: number) => {
        const baseClass = `${styles.star} `;
        const displayRating = hoveredRating || previouslySelectedRating;
        
        if (starNumber <= displayRating) {
        return `${baseClass} ${styles.filled}`;
        } else {
        return `${baseClass} ${styles.empty}`;
        }
    };

    //if the users rating is still loading
    if (isLoading){
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
                        onClick={() => SendRating({recipeId, rating: star, ratingCallback: setPreviouslySelectedRating, setMessage, userAuthData})}
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
}
