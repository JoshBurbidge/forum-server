import Header from "./Header"
import { useCookies } from "react-cookie"
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

export default function Layout({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // console.log(cookies)

  // set this state based on cookies, need to get username
  // let state = { username: null, loggedIn: false }
  // if (cookies.userId) state = { username: "something", loggedIn: true };

  // const [user, setUser] = useState(state)

  return (
    <>
      {/* <UserContext.Provider value={{ user, setUser }}> */}
      <Header />
      <main>{children}</main>
      {/* </UserContext.Provider> */}
    </>
  )
}
