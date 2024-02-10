import styles from './filters.module.css';
import MinMaxSliders from "../minMaxSliders";

export default function ReviewFiltersDropdown({filterValuesAndCallbacks, setShowDropdown}) {
    const {
        lowerRatingVal: lowerRatingVal, 
        setLowerRatingVal: setLowerRatingVal, 
        upperRatingVal: upperRatingVal, 
        setUpperRatingVal: setUpperRatingVal, 
        lowerPriceVal: lowerPriceVal, 
        setLowerPriceVal: setLowerPriceVal, 
        upperPriceVal: upperPriceVal, 
        setUpperPriceVal: setUpperPriceVal
    } = filterValuesAndCallbacks;

  return (
    <>
        <div className={styles.filterDropdownContainer}>
            <div className={styles.filterDropdownCommandsContainer}>
                <div 
                    className={styles.filtersButton}
                    onClick={() => {
                        setLowerRatingVal(0);
                        setUpperRatingVal(10);
                        setLowerPriceVal(1);
                        setUpperPriceVal(4);
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
                <p className={styles.filterCategory}>Ratings</p>
                <MinMaxSliders 
                    lowerVal={lowerRatingVal} 
                    setLowerVal={setLowerRatingVal} 
                    upperVal={upperRatingVal} 
                    setUpperVal={setUpperRatingVal} 
                    min={0} 
                    max={10} 
                    step={.5}
                /> 
                <p className={styles.filterCategory}>Prices</p>
                <MinMaxSliders 
                    lowerVal={lowerPriceVal} 
                    setLowerVal={setLowerPriceVal} 
                    upperVal={upperPriceVal} 
                    setUpperVal={setUpperPriceVal}
                    min={1}
                    max={4}
                    step={1}
                />
            </div>
        </div>
        <div className={styles.filterDropdownArrow} ></div>
    </>
)}