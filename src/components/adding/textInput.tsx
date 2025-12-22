import styles from './inputs.module.css';
import { useState, useRef } from "react";
import { Dispatch, SetStateAction } from 'react';

interface TextInputProps {
  inputTitle: string;
  value: string;
  callback: (newValue: string, index?: number) => void;
  index?: number;
  isDescriptionBox: boolean;
}

export default function TextInput({inputTitle, value, callback, index, isDescriptionBox}: TextInputProps) {

    const [textAreaFocused, setTextAreaFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const hasText = value.length > 0;

    const inputTitleClassName = textAreaFocused || hasText ? `${styles.inputTitle} ${styles.inputTitleFocused}` : `${styles.inputTitle}`;

    const input = isDescriptionBox ?
        <textarea
            ref={textareaRef}
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
            ref={inputRef}
            id={inputTitle}
            value={value}
            className={styles.input}
            onFocus={() => setTextAreaFocused(true)}
            onBlurCapture={() => setTextAreaFocused(false)}
            onChange={(e)=> {
                //This allows for the text input to update only a certain value of a given array if necessary
                if (index !== undefined) {
                    callback(e.target.value, index);
                } else {
                //if the value is not part of an array (indicated by the presence of index) then it will just callback with the normal value
                    callback(e.target.value);
                }
            }}
        />;

  return (
    <div className={styles.inputWrapper}>
        <div className={styles.inputBox}>
            {input}
            <h1 className={inputTitleClassName} onClick={()=>(isDescriptionBox ? textareaRef.current?.focus() : inputRef.current?.focus())}>{inputTitle}</h1>
        </div>
    </div>
)}