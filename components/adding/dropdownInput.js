import styles from "./dropdownInput.module.css"; 
import { useState, useRef } from "react";

export default function DropdownInput({title , list, value, callback}) {

    const [dropdownFocused, setDropdownFocused] = useState(false);
    const myRef = useRef(null);
    const selectedState = value != '';

    const titleClassName = dropdownFocused || selectedState ? `${styles.inputTitle} ${styles.inputTitleFocused}` : `${styles.inputTitle}`

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputBox}>
                <select 
                    ref={myRef}
                    className={`${styles.stateDropdown} ${styles.input}`} 
                    id="state-dropdown" 
                    value={value} 
                    onChange={(e)=>callback(e.target.value)}
                    onFocus={() => setDropdownFocused(true)}
                    onBlur={()=> setDropdownFocused(false)}
                >
                    <option value=""></option>
                    {list.map((code) => (
                        <option key={code} value={code}>{code}</option>
                    ))}
                </select>
                <h1 className={titleClassName} onClick={()=>myRef.current.focus()}>{title}</h1>
            </div>
        </div>
)}