import styles from './inputs.module.css';
import { useState, useRef } from "react";

interface NumberInputProps {
  type: string;
  inputTitle: string;
  value: number;
  callback: (value: number) => void;
  subtext?: string;
}

export default function NumberInput({type, inputTitle, value, callback, subtext}: NumberInputProps) {

  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const myRef = useRef<HTMLInputElement>(null);
  const hasVal = value !== -1;

    const getInputValue = () => {
      if (type === 'Rating 1-10'){
        return (
          <input 
            type="number" 
            ref={myRef}
            value={value === -1 ? '' : value} 
            onChange={(e) => callback(Number(e.target.value))}
            id={inputTitle} 
            name={inputTitle} 
            min="0" 
            max="10" 
            step=".1" 
            size={3}
            onFocus={() => setTextAreaFocused(true)}
            onBlurCapture={() => setTextAreaFocused(false)}
            className={styles.input}
          />
        )
      } else if (type == 'Rating 1-4') {
        return (
          <input 
            type="number" 
            ref={myRef}
            id={inputTitle} 
            value={value === -1 ? '' : value} 
            onChange={(e) => callback(Number(e.target.value))}
            name={inputTitle} 
            min="1" 
            max="4" 
            step="1" 
            size={1}
            onFocus={() => setTextAreaFocused(true)}
            onBlurCapture={() => setTextAreaFocused(false)}
            className={styles.input}
          />
        )
      } else if (type === 'Rating Hours'){
        return (
          <input 
            type="number" 
            ref={myRef}
            id={inputTitle} 
            value={value === -1 ? '' : value} 
            onChange={(e) => callback(Number(e.target.value))}
            name={inputTitle} 
            min="1" 
            max="24" 
            step="1" 
            size={2}
            onFocus={() => setTextAreaFocused(true)}
            onBlurCapture={() => setTextAreaFocused(false)}
            className={styles.input}
          />
        )
      } else if (type === 'Rating Minutes'){
        return (
          <input 
            type="number" 
            ref={myRef}
            id={inputTitle} 
            value={value === -1 ? '' : value} 
            onChange={(e) => callback(Number(e.target.value))}
            name={inputTitle} 
            min="0" 
            max="45" 
            step="15" 
            size={2}
            onFocus={() => setTextAreaFocused(true)}
            onBlurCapture={() => setTextAreaFocused(false)}
            className={styles.input}
          />
        )
      }
    }

    const input = getInputValue();

    const inputTitleClassName = textAreaFocused || hasVal ? `${styles.inputTitle} ${styles.inputTitleFocused}` : `${styles.inputTitle}`;
          
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputBox}>
          {input}
          <h1 className={inputTitleClassName} onClick={()=>myRef.current?.focus()}>{inputTitle}</h1>
          <h3 className={styles.subtext}>{subtext}</h3>
      </div>
    </div>
)}