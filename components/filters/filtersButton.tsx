import styles from './filters.module.css'
import { useState, useEffect } from "react"
import ReviewFiltersDropdown from "./reviewFiltersDropdown";
import RecipeFiltersDropdown from "./recipeFiltersDropdown";

export default function FiltersButton({filterValuesAndCallbacks, isReview}) {

    const [showDropdown, setShowDropdown] = useState(false);

    const dropdown = isReview ? <ReviewFiltersDropdown filterValuesAndCallbacks={filterValuesAndCallbacks} setShowDropdown={setShowDropdown}/> : <RecipeFiltersDropdown filterValuesAndCallbacks={filterValuesAndCallbacks} setShowDropdown={setShowDropdown}/>;
  
    return (
    <div className={styles.filtersContainer}>
        <div className={styles.filterButtonContainer} onClick={()=> setShowDropdown(!showDropdown)}>
            <div className={styles.filterButton}>
                <h2>Filters</h2>
                <svg className={styles.filterIcon} width="20" height="20" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </div>
        </div>
        {showDropdown ? dropdown : undefined}
    </div>
)}
