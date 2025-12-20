import Header from "../../components/header";
import { useState, useEffect } from "react";
import styles from "./Recipe.module.css";
import { useParams } from "react-router-dom";
import AddAComment from "../../components/adding/recipes/addAComment";
import ConvertMinToHoursAndMin from "../../components/functions/convertMinToHoursAndMin";
import FetchRecipe from "../../components/requests/fetchRecipe";
import LoggedInRecipeRating from "../../components/rating/LoggedInRecipeRating";
import NotLoggedInRecipeRating from "../../components/rating/NotLoggedInRecipeRating";
import type { Recipe } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";

export default function Recipe() {
    const userAuthData = useAuth0();
    const { user, isAuthenticated, isLoading } = userAuthData;
    const { id } = useParams();
    const recipeId = Number(id);

    const [recipeData, setRecipeData] = useState<Recipe | null>(null);
    const [recipeLoading, setRecipeLoading] = useState(true);
    const [usersComment, setUsersComment] = useState("");

    //Fetch the recipe data
    useEffect(() => {
        const fetchData = async () => {
            if (recipeId) {
                await FetchRecipe({recipeId, dataCallback: setRecipeData, loadingCallback: setRecipeLoading});
            } else {
                setRecipeLoading(false);
            }
        };
        fetchData();
    }, []);

    if (recipeLoading){
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
    } else if (!recipeData){
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>Data not available</h1>
                    </div>
                </div>
            </>
        )
    } else {
        const {recipe_name, ingredients, prep_time_in_min, meal, instructions, comments, avg_rating} = recipeData;
        const {hours, min} = ConvertMinToHoursAndMin(prep_time_in_min);
        const prepTime = (hours > 1) ? `${hours} hrs ${min} min` : (hours == 1) ? `${hours} hr ${min} min` : `${min} min`;
        
        const ingredientsListItems = Array.isArray(ingredients) ? ingredients.map((ingredient, index) => <li key={"ingredient"+index}>{ingredient}</li>) : undefined;
        const instructionsListItems = Array.isArray(instructions) ? instructions.map((instruction, index) => <li key={"instruction"+index} >Step {index+1}: {instruction}</li>) : undefined;
        const commentsListItems = Array.isArray(comments) ? comments.map((comment, index) => <div key={"comment"+index} className={styles.comment}>{typeof comment === 'string' ? comment : comment.comment}</div>) : undefined;

        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>{recipe_name}</h1>
                        <div className={styles.subTitleContainer}>
                            <p>{meal}</p>
                            <p>Prep Time: {prepTime}</p>
                            <p>
                                {avg_rating ? 
                                    `Avg User Rating: ${avg_rating.toFixed(1)}/5` : 
                                    "No user reviews"
                                }
                            </p>
                        </div>
                    </div>                    
                    <div className={styles.reviewContainer}> 
                        <p>Ingredients:</p>
                        <ul>{ingredientsListItems}</ul>
                        <p>Instructions:</p>
                        <ul>{instructionsListItems}</ul>
                    </div>
                    {isAuthenticated && user ? <LoggedInRecipeRating recipeId={recipeId} userAuthData={userAuthData}/> : <NotLoggedInRecipeRating />}
                    <div className={styles.commentsContainer}>
                        <p className={styles.commentsTitle}>Comments</p>
                        {isAuthenticated && user ? <AddAComment usersComment={usersComment} setUsersComment={setUsersComment} recipeId={recipeId} recipeData={recipeData} setRecipeData={setRecipeData} userAuthData={userAuthData}/>: null}
                        <div className={styles.commentsTable}>{commentsListItems}</div>
                    </div>
                </div>
            </>
        )
    }
}