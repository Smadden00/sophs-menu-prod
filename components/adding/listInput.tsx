import styles from './listInput.module.css'
import TextInput from "./textInput"

export default function ListInput({listTitle, array, callback}) {

    const individualInputTitle = listTitle == "Instructions" ? "Step" : listTitle.slice(0, -1);

    //This function will be passed to each individual text input to update the main array
    const updateArray = (newValue, index) => {
        const newArray = [...array];
        newArray[index] = newValue;
        callback(newArray);
    };

    //When called, this function adds an empty value to the given array
    const addEmptyValueToArray = () => {
        const newArray = [...array, ""];
        callback(newArray);
    }

    // New: Remove an item at a given index
    const removeValueFromArray = (index) => {
        const newArray = array.filter((_, i) => i !== index);
        callback(newArray);
    }

    const inputs = array.map((arrayItem, i) => (
        <div key={`${individualInputTitle} ${i+1}`} className={styles.inputRow}>
            <TextInput inputTitle={`${individualInputTitle} ${i+1}`} value={arrayItem} callback={updateArray} index={i} isDescriptionBox={false}/>
            <button
                type="button"
                className={styles.deleteButton}
                aria-label={`Delete ${individualInputTitle} ${i+1}`}
                onClick={() => removeValueFromArray(i)}
                style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3em', alignSelf: 'center', padding: 0, margin: 0, height: '32px', width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                x
            </button>
        </div>
    ))

  return (
    <div className={styles.listContainer}>
        <div className={styles.listTitleContainer}>
            <h2 className={styles.listTitle}>{listTitle}</h2>
            <input 
                type="button"
                className={styles.listButton}
                value={`Add ${individualInputTitle}`}
                onClick={() => addEmptyValueToArray()}
            />
        </div>
            {inputs}
    </div>
)}