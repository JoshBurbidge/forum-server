import { Box, Typography } from "@mui/material";
import Link from "next/link"

export default function Header(props) {

  let links;
  if (!props.loggedIn) {
    links = (
      <>
        <Link href='/register' >
          <a><Typography marginX={2}>register</Typography></a>
        </Link >
        <Link href='/login' >
          <a><Typography marginX={2}>log in</Typography></a>
        </Link >
      </>
    );
  } else {
    links = (
      <Link href='/dashboard' >
        <a><Typography marginX={2}>{props.username}</Typography></a>
      </Link >
    );
  }

  return (
    <Box width="100%" padding={3} bgcolor="lightblue" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {links}
    </Box>
  )
}