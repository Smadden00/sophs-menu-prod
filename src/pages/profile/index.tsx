import Header from "../../components/header";
import LogInBody from "../../components/logIn/logInBody"
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInProfileBody from "./loggedInProfileBody";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading-text">Loading profile...</div>;
  }

  return (
    <>
        <Header />
        {isAuthenticated && user ? <LoggedInProfileBody userName={user.name}/> : <LogInBody pagePurpose={"view your profile"}/>}
    </>
)}