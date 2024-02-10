import styles from './inputs.module.css'
import { useState, useRef } from "react"

export default function TextInput({inputTitle, value, callback, index, isDescriptionBox}) {

    const [textAreaFocused, setTextAreaFocused] = useState(false);
    const myRef = useRef(null);
    const hasText = value.length > 0;

    const inputTitleClassName = textAreaFocused || hasText ? `${styles.inputTitle} ${styles.inputTitleFocused}` : `${styles.inputTitle}`;

    const input = isDescriptionBox ?
        <textarea
            ref={myRef}
            id={inputTitle}
            value={value}
            style={{width: '600px', height: '100px'}}
            className={styles.input}
            onFocus={() => setTextAreaFocused(true)}
            onBlurCapture={() => setTextAreaFocused(false)}
            onChange={(e)=> callback(e.target.value)}
        />
        :
        <input
            type='text'
            ref={myRef}
            id={inputTitle}
            value={value}
            className={styles.input}
            onFocus={() => setTextAreaFocused(true)}
            onBlurCapture={() => setTextAreaFocused(false)}
            onChange={(e)=> {
                //This allows for the text input to update only a certain value of a given array if necessary
                if (index||index===0) {
                    callback(e.target.value, index)
                } else {
                //if the value is not part of an array (indicated by the presence of index) then it will just callback with the normal value
                    callback(e.target.value)
                }
            }}
        />;

  return (
    <div className={styles.inputWrapper}>
        <div className={styles.inputBox}>
            {input}
            <h1 className={inputTitleClassName} onClick={()=>myRef.current.focus()}>{inputTitle}</h1>
        </div>
    </div>
)}