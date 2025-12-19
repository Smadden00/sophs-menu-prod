import Header from "../../components/header";
import LogInBody from "../../components/logIn/logInBody"
// TODO: Replace with your auth solution
// import { useSession } from "next-auth/react"
import LoggedInProfileBody from "./loggedInProfileBody";

export default function Profile() {
  // TODO: Replace with your auth hook
  // const { data: session, status } = useSession()
  const session = null; // Placeholder - implement auth

  return (
    <>
        <Header />
        {session ? <LoggedInProfileBody /> : <LogInBody pagePurpose={"view your profile"}/>}
    </>
)}