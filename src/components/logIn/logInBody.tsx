import styles from "./logInBody.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogInBody({pagePurpose}: {pagePurpose: string}) {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.container}>
        <div className={styles.logInTitle}>You must log in or create an account to {pagePurpose}.</div>
        <div className={styles.logInButton} onClick={()=>loginWithRedirect()}>Log In</div>
    </div>
)}