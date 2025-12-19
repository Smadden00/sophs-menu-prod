import Header from "../../../components/header";
import AddRecipeBody from "./addRecipeBody";
import LogInBody from "../../../components/logIn/logInBody";
// TODO: Replace with your auth solution
// import { useSession } from "next-auth/react"

export default function AddRecipe() {
    // TODO: Replace with your auth hook
    // const { data: session } = useSession()
    const session = null; // Placeholder - implement auth
    
  return (
    <>
        <Header />
        {session ? <AddRecipeBody /> : <LogInBody pagePurpose={"add a recipe"}/>}
    </>
)}