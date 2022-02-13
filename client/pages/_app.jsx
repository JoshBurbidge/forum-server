import '../styles/globals.css'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '../components/Layout';
import { CookiesProvider, useCookies, Cookies } from "react-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { blue } from "@mui/material/colors"

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies([])
  console.log(cookies)

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[700],
        bg: blue[100]
      }
    }
  });
  // theme.palette.primary.bg = blue[100]
  console.log(theme)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookiesProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp
