import styles from "./recipeListImage.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import ConvertMinToHoursAndMin from '../components/functions/convertMinToHoursAndMin';

export default function RecipeListImage({title, prep_time_in_min, meal, id}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const {hours, min} = ConvertMinToHoursAndMin(prep_time_in_min);

  const prepTime = (hours > 1) ? `${hours} hrs ${min} min` : (hours == 1) ? `${hours} hr ${min} min` : `${min} min`;

  const textBox = (
    <div 
      className={styles.textBox} 
      onClick={() => router.push(`/recipes/${id}`)}
    >
      <h1>{title}</h1>
      <h2>{meal}</h2>
      <h2>Prep Time: {prepTime}</h2>
    </div>
  );


  return (
    <div 
      className={styles.imgContainer}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img 
          style={{height: "250px", width: "auto"}}
          height={250}
          width={250}
          className={hover ? styles.darken : undefined}
          src={`https://sophs-menu-bucket.s3.us-east-2.amazonaws.com/${id}`} 
          alt={"Food"}
      />
      {hover ? textBox : undefined}
    </div>
)}
