import styles from './filters.module.css'
import { useState } from "react"
import ReviewFiltersDropdown from "./reviewFiltersDropdown";
import RecipeFiltersDropdown from "./recipeFiltersDropdown";

interface ReviewFilterValues {
    lowerRatingVal: number;
    setLowerRatingVal: React.Dispatch<React.SetStateAction<number>>;
    upperRatingVal: number;
    setUpperRatingVal: React.Dispatch<React.SetStateAction<number>>;
    lowerPriceVal: number;
    setLowerPriceVal: React.Dispatch<React.SetStateAction<number>>;
    upperPriceVal: number;
    setUpperPriceVal: React.Dispatch<React.SetStateAction<number>>;
    selectedStates: string[];
    setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>;
    sophSubmittedOnly: boolean;
    setSophSubmittedOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RecipeFilterValues {
    lowerPrepTime: number;
    setLowerPrepTime: React.Dispatch<React.SetStateAction<number>>;
    upperPrepTime: number;
    setUpperPrepTime: React.Dispatch<React.SetStateAction<number>>;
    mealFilter: string[];
    setMealFilter: React.Dispatch<React.SetStateAction<string[]>>;
    sophSubmittedOnly: boolean;
    setSophSubmittedOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FiltersButtonProps {
    filterValuesAndCallbacks: ReviewFilterValues | RecipeFilterValues;
    isReview: boolean;
}
export default function FiltersButton({filterValuesAndCallbacks, isReview}: FiltersButtonProps) {

    const [showDropdown, setShowDropdown] = useState(false);

    // Check if any filters are applied (different from default values)
    const hasFiltersApplied = () => {
        if (isReview) {
            const reviewFilters = filterValuesAndCallbacks as ReviewFilterValues;
            return (
                reviewFilters.lowerRatingVal !== 0 ||
                reviewFilters.upperRatingVal !== 10 ||
                reviewFilters.lowerPriceVal !== 0 ||
                reviewFilters.upperPriceVal !== 4 ||
                reviewFilters.selectedStates.length > 0 ||
                reviewFilters.sophSubmittedOnly === true
            );
        } else {
            // For recipes - check against recipe default values
            const recipeFilters = filterValuesAndCallbacks as RecipeFilterValues;
            const defaultMealTypes = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
            const mealFilterChanged = recipeFilters.mealFilter?.length !== defaultMealTypes.length ||
                !defaultMealTypes.every(meal => recipeFilters.mealFilter?.includes(meal));
            
            return (
                recipeFilters.lowerPrepTime !== 0 ||
                recipeFilters.upperPrepTime !== 1500 ||
                mealFilterChanged ||
                recipeFilters.sophSubmittedOnly === true
            );
        }
    };

    const filtersApplied = hasFiltersApplied();

    const dropdown = isReview ? <ReviewFiltersDropdown filterValuesAndCallbacks={filterValuesAndCallbacks as ReviewFilterValues} setShowDropdown={setShowDropdown}/> : <RecipeFiltersDropdown filterValuesAndCallbacks={filterValuesAndCallbacks as RecipeFilterValues} setShowDropdown={setShowDropdown}/>;
  
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
