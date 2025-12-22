import styles from "./recipeListImage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConvertMinToHoursAndMin from '../components/functions/convertMinToHoursAndMin';

interface RecipeListImageProps {
  title: string;
  prep_time_in_min: number;
  meal: string;
  id: number;
  rec_img_url: string;
}

export default function RecipeListImage({title, prep_time_in_min, meal, id, rec_img_url}: RecipeListImageProps) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const {hours, min} = ConvertMinToHoursAndMin(prep_time_in_min);

  const prepTime = (hours > 1) ? `${hours} hrs ${min} min` : (hours == 1) ? `${hours} hr ${min} min` : `${min} min`;

  const textBox = (
    <div 
      className={styles.textBox} 
      onClick={() => navigate(`/recipes/${id}`)}
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
          src={rec_img_url}
          alt={title || "Food"}
      />
      {hover ? textBox : undefined}
    </div>
)}
