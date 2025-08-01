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

    const inputs = array.map((arrayItem, i) => <TextInput inputTitle={`${individualInputTitle} ${i+1}`} value={arrayItem} callback={updateArray} index={i} key={`${individualInputTitle} ${i+1}`} isDescriptionBox={false}/>)

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