import styles from './filters.module.css'
import { useState, useEffect } from "react"
import ReviewFiltersDropdown from "./reviewFiltersDropdown";
import RecipeFiltersDropdown from "./recipeFiltersDropdown";

export default function FiltersButton({filterValuesAndCallbacks, isReview}) {

    const [showDropdown, setShowDropdown] = useState(false);

    // Check if any filters are applied (different from default values)
    const hasFiltersApplied = () => {
        if (isReview) {
            return (
                filterValuesAndCallbacks.lowerRatingVal !== 0 ||
                filterValuesAndCallbacks.upperRatingVal !== 10 ||
                filterValuesAndCallbacks.lowerPriceVal !== 0 ||
                filterValuesAndCallbacks.upperPriceVal !== 4 ||
                filterValuesAndCallbacks.selectedStates.length > 0 ||
                filterValuesAndCallbacks.sophSubmittedOnly === true
            );
        } else {
            // For recipes - check against recipe default values
            const defaultMealTypes = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
            const mealFilterChanged = filterValuesAndCallbacks.mealFilter?.length !== defaultMealTypes.length ||
                !defaultMealTypes.every(meal => filterValuesAndCallbacks.mealFilter?.includes(meal));
            
            return (
                filterValuesAndCallbacks.lowerPrepTime !== 0 ||
                filterValuesAndCallbacks.upperPrepTime !== 1500 ||
                mealFilterChanged ||
                filterValuesAndCallbacks.sophSubmittedOnly === true
            );
        }
    };

    const filtersApplied = hasFiltersApplied();

    const dropdown = isReview ? <ReviewFiltersDropdown filterValuesAndCallbacks={filterValuesAndCallbacks} setShowDropdown={setShowDropdown}/> : <RecipeFiltersDropdown filterValuesAndCallbacks={filterValuesAndCallbacks} setShowDropdown={setShowDropdown}/>;
  
    return (
    <div className={styles.filtersContainer}>
        <div className={styles.filterButtonContainer} onClick={()=> setShowDropdown(!showDropdown)}>
            <div className={`${styles.filterButton} ${filtersApplied ? styles.filterButtonActive : ''}`}>
                <h2>Filters</h2>
                <svg className={styles.filterIcon} width="20" height="20" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </div>
        </div>
        {showDropdown ? dropdown : undefined}
    </div>
)}
