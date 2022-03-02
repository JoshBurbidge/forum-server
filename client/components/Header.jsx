import { Box, Typography, Link, AppBar, ToolBar } from "@mui/material";
import NextLink from "next/link"
import axios from 'axios';
import { useRouter } from "next/router";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useCookies } from "react-cookie";

// use context instead of props to determine header links,
// so we don't have to fetch /me for every page
export default function Header(props) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies([])


  let links;
  // if (!props.loggedIn) {
  if (!user || !user.loggedIn) {
    links = (
      <>
        <Typography marginX={2}>
          <NextLink href='/register' >
            register
          </NextLink >
        </Typography>

        <Typography marginX={2}>
          <NextLink href='/login' >
            log in
          </NextLink >
        </Typography>
      </>
    );
  } else {
    links = (<>
      <Typography marginX={2}>
        <NextLink href='/dashboard' >
          {user.username}
        </NextLink >
      </Typography>

      <Typography marginX={2}>
        {/* logout link, redirects to index */}
        <Link component="button" underline="none" color="inherit" variant="body1">
          <span onClick={async () => {
            await axios.post(process.env.NEXT_PUBLIC_serverDomain + '/users/logout', {}, { withCredentials: true });
            // removeCookie('userId')
            removeCookie("test");
            setUser({ loggedIn: false, username: null })
            router.push('/');
          }} >log out</span>
        </Link>
      </Typography>
    </>);
  }


  return (
    <Box width="100%" padding={3} bgcolor="primary.bg" sx={{ display: 'flex', justifyContent: 'flex-end' }}>


      <Typography marginX={2}><NextLink href={'/'}>Home</NextLink></Typography>
      {links}



    </Box>
  )
}
