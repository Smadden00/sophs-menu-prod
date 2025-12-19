import styles from "./logInBody.module.css";
import { signIn } from "next-auth/react"

export default function LogInBody({pagePurpose}) {
  
  return (
    <div className={styles.container}>
        <div className={styles.logInTitle}>You must log in or create an account to {pagePurpose}.</div>
        <div className={styles.logInButton} onClick={()=>signIn()}>Log In</div>
    </div>
)}