import styles from "../../pages/reviews/addReview/addReview.module.css"
import { useState } from "react"

export default function SearchCityOption({city, currCityValCallback, searchingCallback}) {

    const [optionHover, setOptionHover] = useState(false);

  return (
    <div 
        className={optionHover ? `${styles.cityOption} ${styles.cityOptionHover}` : styles.cityOption} 
        onClick={()=>{
            currCityValCallback(city);
            searchingCallback(false);
        }} 
        onMouseEnter={()=>setOptionHover(true)}
        onMouseLeave={()=>setOptionHover(false)}
    >
        {city}
    </div>
)}