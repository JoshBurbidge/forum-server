import { Box, Typography, Link, Card } from "@mui/material";
import NextLink from "next/link";
import { useState } from 'react'
import { useTheme } from "@mui/material";


export default function Post(props) {
  // console.log(props);
  // const theme = useTheme()
  const [hover, setHover] = useState(false);

  let cardStyle = {}
  if (hover) {
    cardStyle = {
      borderColor: 'black'
    }
  } else {
    cardStyle = {
      borderColor: 'transparent'
    }
  }

  const toggleHover = function () {
    setHover(!hover);
  }

  return (
    <Card onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()}
      sx={{ border: 1, ...cardStyle }}>
      <Typography pl={1} variant="subtitle2">
        posted by {props.post.User.username}
      </Typography>

      <Typography p={2} variant='h6'>
        <NextLink href={"/posts/" + props.post.id} passHref>
          <Link underline={'hover'} color={'black'}>
            {props.post.title}
          </Link>
        </NextLink>
      </Typography>
    </Card>
  );
}