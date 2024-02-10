import styles from './filters.module.css'
import MinMaxSliders from "../minMaxSliders";

export default function RecipeFiltersDropdown({filterValuesAndCallbacks, setShowDropdown}) {
    const {
        lowerPrepTime: lowerPrepTime, 
        setLowerPrepTime: setLowerPrepTime, 
        upperPrepTime: upperPrepTime, 
        setUpperPrepTime: setUpperPrepTime, 
        mealFilter: mealFilter,
        setMealFilter: setMealFilter
    } = filterValuesAndCallbacks;

    const meals = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

    const handleCheckboxChange = (e) => {
        const selectedMeal = e.target.value;
        const isChecked = e.target.checked;
    
        if (isChecked) {
            setMealFilter((mealFilter) => [...mealFilter, selectedMeal]);
        } else {
            const newSelectedMeals = mealFilter.filter(meal => meal != selectedMeal);
            setMealFilter(newSelectedMeals);
        }
      };
    

    const mealRadioInputs = meals.map((meal)=>{
        return (
            <label key={`${meal} label`}>
                <input 
                type='checkbox'
                key={meal}
                value={meal}
                checked={mealFilter.includes(meal)}
                onChange={handleCheckboxChange}
                />{meal}
            </label>
        )
    })


  return (
    <>
        <div className={styles.filterDropdownContainer}>
            <div className={styles.filterDropdownCommandsContainer}>
                <div 
                    className={styles.filtersButton}
                    onClick={() => {
                        setLowerPrepTime(0);
                        setUpperPrepTime(1500);
                        setMealFilter(['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert']);
                    }}
                >
                    <p style={{margin: "2px"}}>Clear Filters</p>
                </div>
                <p 
                    className={styles.filtersButton} 
                    style={{padding: "2px"}}
                    onClick={() => setShowDropdown(false)}
                >X</p>
            </div>
            <div className={styles.filtersSelectorsContainer}>
                <p className={styles.filterCategory}>Prep Time <span style={{fontSize: 'small'}}>(in min)</span></p>
                <MinMaxSliders 
                    lowerVal={lowerPrepTime} 
                    setLowerVal={setLowerPrepTime} 
                    upperVal={upperPrepTime} 
                    setUpperVal={setUpperPrepTime} 
                    min={0} 
                    max={240} 
                    step={15}
                /> 
                <p className={styles.filterCategory}>Meal</p>
                <div className={styles.mealFiltersContainer}>
                    {mealRadioInputs}
                </div>
            </div>
        </div>
        <div className={styles.filterDropdownArrow} ></div>
    </>
)}