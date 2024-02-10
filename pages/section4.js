import styles from "./Home.module.css";
import Link from "next/link"
import Image from 'next/image';
import { useState } from "react";

export default function Section4() {

  //These images should be 400x700

  return (
    <div className={styles.section4}>
      <div className={styles.section4TitleContainer}>
        <h1>Community</h1>
      </div>
      <div className={styles.section4Content}>
        <div className={styles.section4ImageContainer}>
          <Image 
              className={styles.section4Image} 
              fill
              src="/images/duckDuckGoat.jpeg" 
              alt={"Food"}
          />
          <div className={styles.section4TextContainer}>
            <Link className="link" href={{pathname: '/reviews'}}><h1 className={styles.section4Text}>Browse Community Restaurant Reviews</h1></Link>
          </div>
        </div>
        <div className={styles.section4ImageContainer}>
          <Image 
                className={styles.section4Image} 
                fill
                src="/images/mountainSandwich.jpeg" 
                alt={"Food"}
            />
          <div className={styles.section4TextContainer}>
            <Link className="link" href={{pathname: '/profile'}}><h1 className={styles.section4Text}>Create</h1></Link>
          </div>
        </div>
        <div className={styles.section4ImageContainer}>
          <div className={styles.section4TextContainer}>
            <Link className="link" href={{pathname: '/recipes'}}><h1 className={styles.section4Text}>Browse Community <span style={{color: "transparent", fontSize: "1px"}}>...............</span>Recipes</h1></Link>
          </div>
          <Image 
                className={styles.section4Image}
                fill 
                src="/images/galit.jpeg" 
                alt={"Food"}
            />
        </div>
      </div>
    </div>
)}