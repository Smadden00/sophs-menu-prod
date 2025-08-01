import styles from "./Home.module.css";
import Link from "next/link"
import Image from 'next/image';

export default function Section2() {
  return (
    <div className={styles.section2}>
      <div className={styles.section2Background}>
        <div className={styles.section2BackgroundContent}>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              src="/images/smallImgs/soph.jpg"
              width={194}
              height={200}
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              width={200}
              height={213}
              src="/images/smallImgs/biscuit.jpg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              width={210}
              height={215}
              src="/images/smallImgs/pizza.jpg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              width={200}
              height={199}
              src="/images/smallImgs/salad.jpg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              width={200}
              height={213}
              src="/images/smallImgs/biscuit.jpg"
              alt={"Food"}
            />
          </div>
        </div>
        <div className={styles.section2BackgroundContent2}>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              width={230}
              height={229}
              src="/images/smallImgs/spread.jpg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              width={200}
              height={213}
              src="/images/smallImgs/biscuit.jpg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              width={200}
              height={213}
              src="/images/smallImgs/biscuit.jpg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              width={200}
              height={213}
              src="/images/smallImgs/biscuit.jpg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              width={200}
              height={213}
              src="/images/smallImgs/biscuit.jpg"
              alt={"Food"}
            />
          </div>
        </div>
        <div className={styles.section2Text}>
          <h1>Find recipes and restaurant reviews from Sophia and the community...</h1>
        </div>
      </div>
    </div>
)}