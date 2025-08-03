import Header from "../../components/header";
import LogInBody from "../../components/logIn/logInBody"
import { useSession } from "next-auth/react"
import LoggedInProfileBody from "./loggedInProfileBody";

export default function Profile() {
  const { data: session, status } = useSession()

  console.log("Session status:", status)
  console.log("Session data:", session)

  return (
    <>
        <Header Title="Profile" />
        {session ? <LoggedInProfileBody /> : <LogInBody pagePurpose={"view your profile"}/>}
    </>
)}