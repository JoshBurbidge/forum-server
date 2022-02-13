import Header from "./Header"
import { useCookies } from "react-cookie"
import { UserContext } from "./user-context";
import { useContext, useState } from "react";

export default function Layout({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // console.log(cookies)
  const [user, setUser] = useState({ username: null, loggedIn: false })

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <main>{children}</main>
      </UserContext.Provider>
    </>
  )
}

// user status is determined by cookie
// can i check cookie in layout? or _app?
// 