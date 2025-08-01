import styles from "./Home.module.css";
import Link from "next/link"
import Image from 'next/image';
import { useState } from "react";

export default function Section3() {

  const [hover, setHover] = useState<number | boolean>(false);

  const image = hover===1 ? <Image className={`${styles.image} ${styles.section3Image}`} height={350} width={350} src="/images/galit.jpeg" alt={"Food"}/> : hover===2 ? <Image className={`${styles.image} ${styles.section3Image}`} height={350} width={350} src="/images/duckDuckGoat.jpeg" alt={"Food"}/> : undefined;


  return (
    <div className={styles.section3}>
      <div className={styles.section3LeftContainer}>
        <div className={styles.section3TitleContainer}>
          <h1>Soph's Reviews and Recipes</h1>
        </div>
        <div className={styles.section3ImageContainer}>
          {image}
        </div>
      </div>
      <div className={styles.section3TextContainer}>
        <div className={styles.section3InspirationContainer}>
          <Link style={{textDecoration: "none"}} href={{pathname: '/recipes'}}>
            <h1 className={`${styles.section3LinkText} link`}
          >Explore Sophia's Recipes</h1></Link>
          <Link style={{textDecoration: "none"}} href={{pathname: '/reviews'}}><h1 
            className={`${styles.section3LinkText} link`}
          >Explore Sophia's Restaurant Reviews</h1></Link>
        </div>
      </div>
    </div>
)}