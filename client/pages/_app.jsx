import '../styles/globals.css'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserContext } from '../components/user-context';


function MyApp({ Component, pageProps }) {


  return (
    <>

      <Component {...pageProps} />

    </>
  );
}

export default MyApp
