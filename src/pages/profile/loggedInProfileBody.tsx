import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import ProfileReviewTable from "../../components/reviewComponents/profileReviewTable";
import ProfileRecipesTable from "../../components/reviewComponents/profileRecipesTable";
import RatedRecipesTable from "../../components/reviewComponents/ratedRecipesTable";
import FetchProfileReviews from "../../components/requests/fetchProfileReviews"
import FetchProfileRecipes from "../../components/requests/fetchProfileRecipes";
import FetchRatedRecipes from "../../components/requests/fetchRatedRecipes";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Review, Recipe, RecipeRating } from "../../types/index"

export default function LoggedInProfileBody({userName}:{userName: string | undefined}) {
    const { getAccessTokenSilently } = useAuth0();
    const [profileRestReviewsData, setProfileRestReviewsData] = useState<Review[]>([]);
    const [profileRestReviewsLoading, setProfileRestReviewsLoading] = useState(true);

    const [profileRecipesData, setProfileRecipesData] = useState<Recipe[]>([]);
    const [profileRecipesLoading, setProfileRecipesLoading] = useState(true);

    const [ratedRecipesData, setRatedRecipesData] = useState<RecipeRating[]>([]);
    const [ratedRecipesLoading, setRatedRecipesLoading] = useState(true);

    useEffect(() => {
        FetchProfileReviews({ dataCallback: setProfileRestReviewsData, loadingCallback: setProfileRestReviewsLoading, getAccessTokenSilently });
        FetchProfileRecipes({ dataCallback: setProfileRecipesData, loadingCallback: setProfileRecipesLoading, getAccessTokenSilently });
        FetchRatedRecipes({ dataCallback: setRatedRecipesData, loadingCallback: setRatedRecipesLoading, getAccessTokenSilently });
    }, [getAccessTokenSilently])

    return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{userName ? userName : "undefined"}</h1>
                </div>

                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <ProfileReviewTable profileRestReviewsData={profileRestReviewsData} profileRestReviewsLoading={profileRestReviewsLoading}/>
                    </div>
                    <div className={styles.recipesTablesContainer}>
                        <div className={styles.content}>
                            <ProfileRecipesTable profileRecipesData={profileRecipesData} profileRecipesLoading={profileRecipesLoading} />
                        </div>
                        <div className={styles.content}>
                            <RatedRecipesTable ratedRecipesData={ratedRecipesData} ratedRecipesLoading={ratedRecipesLoading} />
                        </div>
                    </div>
                </div>

            </div>
    )
  
}