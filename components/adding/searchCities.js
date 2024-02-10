import styles from './inputs.module.css'
import { useState, useEffect, useRef } from "react"
import SearchCityOption from "./searchCityOption";

export default function SearchCities({cities, currCityVal, currCityValCallback}) {

    const [textAreaFocused, setTextAreaFocused] = useState(false);
    const [currentlySearching, setCurrentlySearching] = useState(true);
    const myRef = useRef(null);
    const hasText = currCityVal.length > 0;

    const filteredCities = cities.filter((indivCityInList) => indivCityInList.toLowerCase().includes(currCityVal.toLowerCase()));
    const cityOptionDivs = filteredCities.map((filteredCity)=> {
        return (
            <SearchCityOption city={filteredCity} currCityValCallback={currCityValCallback} searchingCallback={setCurrentlySearching} key={filteredCity}/>
        )});

    useEffect(() => {
        setCurrentlySearching(true);
      },[currCityVal]);

    const citiesListDropdown = (
            <div className={styles.citiesSearchDropdown}>
                {cityOptionDivs}
            </div>
          );

    const inputTitleClassName = textAreaFocused || hasText ? `${styles.inputTitle} ${styles.inputTitleFocused}` : `${styles.inputTitle}`;

  return (
    <div className={styles.inputWrapper}>
        <div className={styles.inputBox}>
            <div className={styles.citySearchContainer}>
                <input
                    type="text" 
                    id="Cities"
                    ref={myRef}
                    value={currCityVal}
                    onFocus={()=> setTextAreaFocused(true)}
                    onBlur={()=> setTextAreaFocused(false)}
                    onChange={(e)=> currCityValCallback(e.target.value)}
                    className={styles.input}
                />
                {currCityVal && currCityVal.length>1 && currentlySearching ? citiesListDropdown : undefined}
            </div>
            <h1 className={inputTitleClassName} onClick={()=>myRef.current.focus()}>City/Town</h1>
        </div>
    </div>
)}