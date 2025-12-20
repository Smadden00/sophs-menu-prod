import React from 'react';
import styles from "./profileTable.module.css";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../types/index"

export default function ProfileRecipesTable({profileRecipesData, profileRecipesLoading}: {profileRecipesData: Recipe[], profileRecipesLoading: boolean}){

    const navigate = useNavigate();

    const tableBody = profileRecipesLoading 
        ? <h2>LOADING</h2>
        : (
            <tbody>
                    {profileRecipesData.map((item, index) => (
                        <tr className={styles.tableItem} key={"recipe"+index} onClick={() => navigate(`/recipes/${item.recipe_id}`)}>
                            <td>{item.recipe_name}</td>
                            <td>{item.avg_rating}</td>
                        </tr>
                    ))}
            </tbody>
        );

  return (
        <div className={styles.tableContainer}>
            <h2 className={styles.title}>Your Recipes</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Recipe</th>
                    <th>Avg User Rating</th>
                </tr>
                </thead>
                {tableBody}
            </table>
        </div>
  );
};