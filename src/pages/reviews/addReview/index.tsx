import Header from "../../../components/header";
import AddReviewBody from "./addReviewBody";
import LogInBody from "../../../components/logIn/logInBody";
import { useAuth0 } from "@auth0/auth0-react";

export default function Reviews() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading-text">Loading profile...</div>;
  }
  
  return (
    <>
        <Header />
        {isAuthenticated && user ? <AddReviewBody user={user}/> : <LogInBody pagePurpose={"add a review"}/>}
    </>
)}