import { Box, Typography, Link } from "@mui/material";
import NextLink from "next/link"
import axios from 'axios';
import { useRouter } from "next/router";
import { UserContext } from "../components/user-context";
import { useContext } from "react";

// use context instead of props to determine header links,
// so we don't have to fetch /me for every page
export default function Header(props) {
  const router = useRouter();
  const user = useContext(UserContext);


  let links;
  if (!props.loggedIn) {
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
          {props.username}
        </NextLink >
      </Typography>

      <Typography marginX={2} >
        {/* logout link, redirects to index */}
        <Link component="button" underline="none" color="inherit" variant="body1">
          <a onClick={async () => {
            await axios.post(process.env.NEXT_PUBLIC_serverDomain + '/users/logout', {}, { withCredentials: true });
            router.push('/');
          }} >log out</a>
        </Link>
      </Typography>
    </>);
  }


  return (
    <Box width="100%" padding={3} bgcolor="lightblue" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {user.name}
      {links}
    </Box>
  )
}
