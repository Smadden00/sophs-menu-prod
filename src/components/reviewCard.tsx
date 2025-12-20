import styles from "./reviewCard.module.css";
import { useNavigate } from "react-router-dom";
import BuildPriceSigns from "./functions/buildPriceSigns";

interface ReviewCardProps {
  title: string;
  location: string;
  restType: string;
  price: number;
  rating: number;
  id: number;
}

export default function ReviewCard({title, location, restType, price, rating, id}: ReviewCardProps) {
  const navigate = useNavigate();

  const priceSigns=BuildPriceSigns(price);

  return (
    <div className={styles.reviewCardContainer}>
        <div 
            className={styles.textBox}
            onClick={() => navigate(`/reviews/${id}`)}
        >
            <p className={styles.title}>{title}</p>
            <p>Rating: {rating} / 10</p>
            <p>Price: {priceSigns}</p>
            <p>{restType}</p>
            <p>{location}</p>
        </div>
    </div>
)}
