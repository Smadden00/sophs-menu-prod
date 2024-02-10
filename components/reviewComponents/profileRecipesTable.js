import React from 'react';
import styles from "./profileTable.module.css";
import { useRouter } from "next/router";

export default function ProfileRecipesTable({profileRecipesData, profileRecipesLoading}){

    const router = useRouter();

    const tableBody = profileRecipesLoading 
        ? <h2>LOADING</h2>
        : (
            <tbody>
                    {profileRecipesData.map((item, index) => (
                        <tr className={styles.tableItem} key={"recipe"+index} onClick={() => router.push(`/recipes/${item.recipe_id}`)}>
                            <td>{item.recipe_name}</td>
                            <td>{item.rating}</td>
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
                    <th>Average Rating</th>
                </tr>
                </thead>
                {tableBody}
            </table>
        </div>
  );
};