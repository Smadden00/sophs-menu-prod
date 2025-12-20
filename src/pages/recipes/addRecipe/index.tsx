import Header from "../../../components/header";
import AddRecipeBody from "./addRecipeBody";
import LogInBody from "../../../components/logIn/logInBody";
import { useAuth0 } from "@auth0/auth0-react";

export default function AddRecipe() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading-text">Loading profile...</div>;
  }
    
  return (
    <>
        <Header />
        {isAuthenticated && user ? <AddRecipeBody /> : <LogInBody pagePurpose={"add a recipe"}/>}
    </>
)}