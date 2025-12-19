import styles from "./Home.module.css";
import { Link } from "react-router-dom"
import { useState } from "react";

export default function Section4() {

  const [hover, setHover] = useState<number | boolean>(false);

  const image = hover===1 ? 
    <img 
      className={`${styles.image} ${styles.section3Image}`} 
      height={350} 
      width={350} 
      src="/images/bigImgs/duckDuckGoat.jpeg" 
      alt="Food from Galit restaurant"
    /> : 
    hover===2 ? 
    <img 
      className={`${styles.image} ${styles.section3Image}`} 
      height={350} 
      width={350} 
      src="/images/smallImgs/biscuit.jpg" 
      alt="Food from Duck Duck Goat restaurant"
    /> : 
    <img 
      className={`${styles.image} ${styles.section3Image}`} 
      height={350} 
      width={350} 
      src="/images/bigImgs/galit.jpeg" 
      alt="Default food image"
    />;


  return (
    <div className={styles.section4}>
      <div className={styles.section3LeftContainer}>
        <div className={styles.section3TitleContainer}>
          <h1>Community Reviews and Recipes</h1>
        </div>
        <div className={styles.section3ImageContainer}>
          {image}
        </div>
      </div>
      <div className={styles.section3TextContainer}>
        <div className={styles.section3InspirationContainer}>
          <Link 
            style={{textDecoration: "none"}} 
            to="/recipes"
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(false)}
          >
            <h1 className={`${styles.section3LinkText} link`}
          >Explore Recipes From The Community</h1></Link>
          <Link 
            style={{textDecoration: "none"}} 
            to="/reviews"
            onMouseEnter={() => setHover(2)}
            onMouseLeave={() => setHover(false)}
          ><h1 
            className={`${styles.section3LinkText} link`}
          >Explore Restaurant Reviews From The Community</h1></Link>
        </div>
      </div>
    </div>
)}