import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { useSession } from "next-auth/react"
import ProfileReviewTable from "../../components/reviewComponents/profileReviewTable";
import ProfileRecipesTable from "../../components/reviewComponents/profileRecipesTable";
import FetchProfileReviews from "../../components/requests/fetchProfileReviews";
import FetchProfileRecipes from "../../components/requests/fetchProfileRecipes";
import { useRouter } from "next/router";

export default function LoggedInProfileBody({}) {
    const router = useRouter();

    const {data: session} = useSession();

    const [profileRestReviewsData, setProfileRestReviewsData] = useState();
    const [profileRestReviewsLoading, setProfileRestReviewsLoading] = useState(true);

    const [profileRecipesData, setProfileRecipesData] = useState();
    const [profileRecipesLoading, setProfileRecipesLoading] = useState(true);

    useEffect(() => {
        if (session){
            FetchProfileReviews(setProfileRestReviewsData, setProfileRestReviewsLoading);
            FetchProfileRecipes(setProfileRecipesData, setProfileRecipesLoading)
        }
    }, [session])

    const name = session ? session.user.name : undefined;

    return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{name}</h1>
                </div>

                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <ProfileReviewTable profileRestReviewsData={profileRestReviewsData} profileRestReviewsLoading={profileRestReviewsLoading}/>
                    </div>
                    <div className={styles.content}>
                        <ProfileRecipesTable profileRecipesData={profileRecipesData} profileRecipesLoading={profileRecipesLoading} />
                    </div>
                </div>

            </div>
    )
  
}