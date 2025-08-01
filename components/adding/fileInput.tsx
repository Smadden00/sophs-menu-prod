import styles from './fileInput.module.css';
import { ChangeEvent } from 'react';

interface FileInputProps {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({handleFileChange}: FileInputProps) {


  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Photo</h2>
        <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
        <h3 className={styles.subtext}>Please upload a .png, .jpg, or .jpeg file</h3>
    </div>
)}