import styles from './addingError.module.css'
import { Dispatch, SetStateAction } from 'react'

interface AddingErrorProps {
  error: {field: string, message: string};
  setInputError: Dispatch<SetStateAction<{ field: string; message: string; isError: boolean} | null>>;
}


export default function AddingError({error, setInputError}: AddingErrorProps) {


  return (
    <div className={styles.container}>
        <div className={styles.upperRow}>
            <h2 className={styles.title}>Error</h2>
            <div 
                className={styles.exit}
                onClick={() => setInputError(null)}
            >X</div>
        </div>
        <div className={styles.contentBox}>
            <h3>Field: <span className={styles.content}>{error.field}</span></h3>
            <h3>Error: <span className={styles.content}>{error.message}</span></h3>
        </div>
    </div>
)}