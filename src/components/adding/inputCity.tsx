/*import styles from './inputs.module.css'
import { useState, useRef } from "react"

export default function inputCity({ currCityVal, currCityValCallback}) {

    const [textAreaFocused, setTextAreaFocused] = useState(false);
    const myRef = useRef(null);
    const hasText = currCityVal.length > 0;

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
            </div>
            <h1 className={inputTitleClassName} onClick={()=>myRef.current.focus()}>City/Town</h1>
        </div>
    </div>
)}
*/