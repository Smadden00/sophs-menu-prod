import styles from './filters.module.css';
import MinMaxSliders from "../minMaxSliders";
import StateCodes from "../consts/state_codes";

interface ReviewFiltersDropdownProps {
    filterValuesAndCallbacks: {
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
    };
    setShowDropdown: (value: boolean) => void;
}

export default function ReviewFiltersDropdown({filterValuesAndCallbacks, setShowDropdown}: ReviewFiltersDropdownProps) {
    const {
        lowerRatingVal: lowerRatingVal, 
        setLowerRatingVal: setLowerRatingVal, 
        upperRatingVal: upperRatingVal, 
        setUpperRatingVal: setUpperRatingVal, 
        lowerPriceVal: lowerPriceVal, 
        setLowerPriceVal: setLowerPriceVal, 
        upperPriceVal: upperPriceVal, 
        setUpperPriceVal: setUpperPriceVal,
        selectedStates: selectedStates,
        setSelectedStates: setSelectedStates,
        sophSubmittedOnly: sophSubmittedOnly,
        setSophSubmittedOnly: setSophSubmittedOnly
    } = filterValuesAndCallbacks;

    const stateCodes = StateCodes();

    const handleStateChange = (stateCode: string) => {
        if (selectedStates.includes(stateCode)) {
            setSelectedStates(selectedStates.filter(state => state !== stateCode));
        } else {
            setSelectedStates([...selectedStates, stateCode]);
        }
    };

  return (
    <>
        <div className={styles.filterDropdownContainer}>
            <div className={styles.filterDropdownCommandsContainer}>
                <div 
                    className={styles.filtersButton}
                    onClick={() => {
                        setLowerRatingVal(0);
                        setUpperRatingVal(10);
                        setLowerPriceVal(0);
                        setUpperPriceVal(4);
                        setSelectedStates([]);
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
                <p className={styles.filterCategory}>Soph's Reviews</p>
                <div className={styles.checkboxContainer}>
                    <label className={styles.checkboxLabel}>
                        <input 
                            type="checkbox" 
                            checked={sophSubmittedOnly}
                            onChange={(e) => setSophSubmittedOnly(e.target.checked)}
                            className={styles.checkbox}
                        />
                        Show only Soph's  reviews
                    </label>
                </div>
                <p className={styles.filterCategory}>States</p>
                <div className={styles.stateFilterContainer}>
                    <div className={styles.stateGrid}>
                        {stateCodes.map((stateCode) => (
                            <div 
                                key={stateCode}
                                className={`${styles.stateOption} ${selectedStates.includes(stateCode) ? styles.selectedState : ''}`}
                                onClick={() => handleStateChange(stateCode)}
                            >
                                {stateCode}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.filterDropdownArrow} ></div>
    </>
)}