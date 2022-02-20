import '../styles/globals.css'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '../components/Layout';
import { CookiesProvider, useCookies } from "react-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { blue } from "@mui/material/colors"
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '../components/UserContext';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const router = useRouter();
  // console.log(pageProps)

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[700],
        bg: blue[100]
      }
    }
  });
  // theme.palette.primary.bg = blue[100]
  // console.log(theme)

  let currentUser = { loggedIn: false }
  // if (cookies.userId) state = { username: "something", loggedIn: true };
  let [user, setUser] = useState()

  useEffect(() => {
    if (pageProps.protected && !user) {

      console.log('protected')
      // get current user from server
      axios.get(process.env.NEXT_PUBLIC_serverDomain + '/users/me', {
        withCredentials: true,
      })
        .then(res => {
          // console.log(res.data)
          const { loggedIn, username } = res.data;
          if (!loggedIn) { // redirect if not logged in
            router.push('/login');
          } else {
            setUser({ loggedIn: loggedIn, username: username });
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
  })

  // make a loading component
  if (pageProps.protected && !user) return <></>

  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <CookiesProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CookiesProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp
