import styles from "./Home.module.css";
import Link from "next/link"
import Image from 'next/image';
import { useState } from "react";

export default function Section3() {

  const [hover, setHover] = useState<number | boolean>(false);

  const image = hover===1 ? 
    <Image 
      className={`${styles.image} ${styles.section3Image}`} 
      height={350} 
      width={350} 
      src="/images/smallImgs/spread.jpg" 
      alt="Food from Galit restaurant"
      quality={75}
      loading="lazy"
    /> : 
    hover===2 ? 
    <Image 
      className={`${styles.image} ${styles.section3Image}`} 
      height={350} 
      width={350} 
      src="/images/smallImgs/pizza.jpg" 
      alt="Food from Duck Duck Goat restaurant"
      quality={75}
      loading="lazy"
    /> : 
    <Image 
      className={`${styles.image} ${styles.section3Image}`} 
      height={350} 
      width={350} 
      src="/images/smallImgs/salad.jpg" 
      alt="Default food image"
      priority={true}
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAAAAAB/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8A0XGLjF3iLxS7xCGZFOSa6JMjgznVhRQb5Z2AGQqgOooDYqGBVRAcYdgKrCjGCoEa4owlIQ1ykRVjlFVQGCqk5jA=="
    />;


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
          <Link 
            style={{textDecoration: "none"}} 
            href={{pathname: '/recipes'}}
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(false)}
          >
            <h1 className={`${styles.section3LinkText} link`}
          >Explore Sophia's Recipes</h1></Link>
          <Link 
            style={{textDecoration: "none"}} 
            href={{pathname: '/reviews'}}
            onMouseEnter={() => setHover(2)}
            onMouseLeave={() => setHover(false)}
          ><h1 
            className={`${styles.section3LinkText} link`}
          >Explore Sophia's Restaurant Reviews</h1></Link>
        </div>
      </div>
    </div>
)}