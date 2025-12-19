import Header from "../../../components/header";
import AddReviewBody from "./addReviewBody";
import LogInBody from "../../../components/logIn/logInBody";
// TODO: Replace with your auth solution
// import { useSession } from "next-auth/react"

export default function Reviews() {
  // TODO: Replace with your auth hook
  // const { data: session } = useSession()
  const session = null; // Placeholder - implement auth
  
  return (
    <>
        <Header />
        {session ? <AddReviewBody /> : <LogInBody pagePurpose={"add a review"}/>}
    </>
)}