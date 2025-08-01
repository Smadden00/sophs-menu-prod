import styles from "./reviewCard.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import BuildPriceSigns from "./functions/buildPriceSigns";

export default function ReviewCard({title, location, cuisine, price, rating, id}) {
  const router = useRouter();

  const priceSigns=BuildPriceSigns(price);


  return (
    <div className={styles.reviewCardContainer}>
        <div 
            className={styles.textBox}
            onClick={() => router.push(`/reviews/${id}`)}
        >
            <p className={styles.title}>{title}</p>
            <p>Rating: {rating} / 10</p>
            <p>Price: {priceSigns}</p>
            <p>{cuisine}</p>
            <p>{location}</p>
        </div>
    </div>
)}
