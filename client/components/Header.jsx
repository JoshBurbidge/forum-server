import { Box, Typography } from "@mui/material";
import Link from "next/link"

export default function Header(props) {

  let links;
  if (!props.loggedIn) {
    links = (
      <>
        <Typography marginX={2}>
          <Link href='/register' >
            register
          </Link >
        </Typography>

        <Typography marginX={2}>
          <Link href='/login' >
            log in
          </Link >
        </Typography>
      </>
    );
  } else {
    links = (
      <Typography marginX={2}>
        <Link href='/dashboard' >
          {props.username}
        </Link >
      </Typography>
    );
  }

  return (
    <Box width="100%" padding={3} bgcolor="lightblue" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {links}
    </Box>
  )
}