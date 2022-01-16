import { Box, Typography } from "@mui/material";
import NextLink from "next/link";



export default function Post(props) {
  // console.log(props);


  return (
    <Box border="solid thin black" sx={{}}>
      <Typography pl={1} variant="subtitle2">
        posted by {props.post.User.username}
      </Typography>
      <Typography pt={1} pb={2} px={2} component='h2' variant='h6'>
        <NextLink href={"/posts/" + props.post.id}>
          {props.post.title}
        </NextLink>
      </Typography>
    </Box>
  );
}