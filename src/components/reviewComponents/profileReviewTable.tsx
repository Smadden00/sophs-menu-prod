import React from 'react';
import styles from "./profileTable.module.css";
import { useNavigate } from "react-router-dom";
import { Review } from "../../types/index"

export default function ProfileReviewTable({profileRestReviewsData, profileRestReviewsLoading}: {profileRestReviewsData: Review[], profileRestReviewsLoading: boolean}){

    const navigate = useNavigate();

    const tableBody = profileRestReviewsLoading 
        ? <h2>LOADING</h2>
        : (
            <tbody>
                    {profileRestReviewsData.map((item, index) => (
                        <tr className={styles.tableItem} key={"review" +index} onClick={() => navigate(`/reviews/${item.review_id}`)}>
                            <td>{item.rest_name}</td>
                            <td>{item.o_rating}</td>
                        </tr>
                    ))}
            </tbody>
        );

  return (
        <div className={styles.tableContainer}>
            <h2 className={styles.title}>Your Restaurant Reviews</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Restaurant</th>
                    <th>Your Overall Rating</th>
                </tr>
                </thead>
                {tableBody}
            </table>
        </div>
  );
};