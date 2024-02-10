import styles from "./Home.module.css";
import Link from "next/link"
import Image from 'next/image';

export default function Section1() {

  return (
    <div className={styles.section1}>
        <div className={styles.section1TitleContainer}>
            <h1 className={styles.section1Title1}>Soph's</h1>
            <h1 className={styles.section1Title2}>Menu</h1>
        </div>
        <div className={styles.section1Content}>
            <div className={styles.navbar}>
                <Link className="link" href={{pathname: '/reviews'}}><h1 className={styles.linkText}>Soph's Reviews</h1></Link>
                <Link className="link" href={{pathname: '/recipes'}}><h1 className={styles.linkText}>Soph's Recipes</h1></Link>
                <Link className="link" href={{pathname: '/reviews'}}><h1 className={styles.linkText}>Community Reviews</h1></Link>
                <Link className="link" href={{pathname: '/recipes'}}><h1 className={styles.linkText}>Community Recipes</h1></Link>
                <Link className="link" href={{pathname: '/profile'}}>
                    <svg width="25" height="25" className="instaLogo" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                </Link>
            </div>
            <div className={styles.reels}>
                <Image 
                    className={styles.image}
                    height={350}
                    width={350}
                    src="/images/sophsLogo.png"
                    alt={"Food"}
                />
            </div>
        </div>
    </div>
)}