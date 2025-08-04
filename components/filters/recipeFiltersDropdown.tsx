import styles from './filters.module.css'
import MinMaxSliders from "../minMaxSliders";

export default function RecipeFiltersDropdown({filterValuesAndCallbacks, setShowDropdown}) {
    const {
        lowerPrepTime: lowerPrepTime, 
        setLowerPrepTime: setLowerPrepTime, 
        upperPrepTime: upperPrepTime, 
        setUpperPrepTime: setUpperPrepTime, 
        mealFilter: mealFilter,
        setMealFilter: setMealFilter,
        sophSubmittedOnly: sophSubmittedOnly,
        setSophSubmittedOnly: setSophSubmittedOnly
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
            <label key={`${meal} label`} className={styles.mealFilterItem}>
                <input 
                type='checkbox'
                key={meal}
                value={meal}
                checked={mealFilter.includes(meal)}
                onChange={handleCheckboxChange}
                />
                {meal}
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
                        setSophSubmittedOnly(false);
                    }}
                    style={{
                        fontSize: '13px',
                        fontWeight: '600'
                    }}
                >
                    Clear Filters
                </div>
                <div 
                    className={styles.filtersButton}
                    onClick={() => setShowDropdown(false)}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >×</div>
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
                <p className={styles.filterCategory}>Soph's Recipes</p>
                <div className={styles.checkboxContainer}>
                    <label className={styles.checkboxLabel}>
                        <input 
                            type="checkbox"
                            checked={sophSubmittedOnly}
                            onChange={(e) => setSophSubmittedOnly(e.target.checked)}
                            className={styles.checkbox}
                        />
                        Show only Soph's recipes
                    </label>
                </div>
                <p className={styles.filterCategory}>Meal</p>
                <div className={styles.mealFiltersContainer}>
                    {mealRadioInputs}
                </div>
            </div>
        </div>
        <div className={styles.filterDropdownArrow} ></div>
    </>
)}