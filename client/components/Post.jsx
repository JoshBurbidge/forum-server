import { Box, Typography } from "@mui/material";


export default function Post(props) {


  return (
    <Box border="solid thin black" sx={{}}>
      <Typography component='h2' variant='h6'>
        {props.title}
      </Typography>
    </Box>
  );
}