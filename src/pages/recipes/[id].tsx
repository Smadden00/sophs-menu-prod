import Header from "../../components/header";
import { useState, useEffect } from "react";
import styles from "./Recipe.module.css";
import { useParams } from "react-router-dom";
import AddAComment from "../../components/adding/addAComment";
import ConvertMinToHoursAndMin from "../../components/functions/convertMinToHoursAndMin";
import FetchRecipe from "../../components/requests/fetchRecipe";
import RecipeRating from "../../components/rating/RecipeRating";
import type { Recipe } from "../../types";

export default function Recipe() {
    const { id } = useParams();

    const [recipeData, setRecipeData] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [usersComment, setUsersComment] = useState("");

    //Fetch the recipe data
    useEffect(() => {
        if (id) {
            FetchRecipe(Number(id), setRecipeData, setLoading);
        }
    }, [id]);

    if (loading || !recipeData){
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
        const {recipe_name, ingredients, prep_time_in_min, meal, instructions, comments, averageRating} = recipeData;
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
                                {averageRating ? 
                                    `Avg User Rating: ${averageRating.toFixed(1)}/5` : 
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
                    <RecipeRating 
                        recipeId={id as string}
                    />
                    <div className={styles.commentsContainer}>
                        <p className={styles.commentsTitle}>Comments</p>
                        <AddAComment usersComment={usersComment} setUsersComment={setUsersComment} id={id} recipeData={recipeData} setRecipeData={setRecipeData} />
                        <div className={styles.commentsTable}>{commentsListItems}</div>
                    </div>
                </div>
            </>
        )
    }
}