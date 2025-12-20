import React from 'react';
import styles from "./profileTable.module.css";
import { useNavigate } from "react-router-dom";
import { RecipeRating } from "../../types/index"

interface RatedRecipesTableProps {
    ratedRecipesData: RecipeRating[];
    ratedRecipesLoading: boolean;
}

export default function RatedRecipesTable({ratedRecipesData, ratedRecipesLoading}: RatedRecipesTableProps){

    const navigate = useNavigate();

    const tableBody = ratedRecipesLoading 
        ? <h2>LOADING</h2>
        : (
            <tbody>
                    {ratedRecipesData.map((item, index) => (
                        <tr className={styles.tableItem} key={"ratedRecipe"+index} onClick={() => navigate(`/recipes/${item.recipe_id}`)}>
                            <td>{item.recipe_name}</td>
                            <td>{item.rating}</td>
                        </tr>
                    ))}
            </tbody>
        );

  return (
        <div className={styles.tableContainer}>
            <h2 className={styles.title}>Recipes You've Reviewed</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Recipe</th>
                    <th>Your Rating</th>
                </tr>
                </thead>
                {tableBody}
            </table>
        </div>
  );
};
