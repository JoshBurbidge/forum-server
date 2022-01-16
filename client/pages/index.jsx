import { Box, Container, Stack, Typography } from '@mui/material'
import PostCard from '../components/PostCard';
import Header from '../components/Header';
import axios from 'axios'
import { getUserIdCookie } from '../util/cookie';
import ArrowButton from '../components/ArrowButton';
import { useState, useContext } from 'react';
import { UserContext } from '../components/user-context';



export async function getServerSideProps(ctx) {
  const url = process.env.NEXT_PUBLIC_serverDomain + "/posts/all";
  const postsRes = await fetch(url);
  const allPosts = await postsRes.json();

  const { req, res } = ctx;
  // console.log("cookie: ", getUserIdCookie(ctx));

  const meResponse = await axios.get(process.env.NEXT_PUBLIC_serverDomain + '/users/me', {
    withCredentials: true,
    headers: {
      cookie: getUserIdCookie(req)
    }
  });

  let { loggedIn, username } = meResponse.data;
  if (username === undefined) username = null;
  // console.log(meResponse.data);

  return {
    props: {
      posts: allPosts,
      loggedIn: loggedIn,
      username: username
    }
  };
}


export default function Home(props) {
  //console.log(props);
  const [currentPosts, setCurrentPosts] = useState(props.posts);

  let postsList = currentPosts.map(post => {
    return <PostCard post={post} key={post.id} />
  });

  async function getNextPage() {
    const res = await fetch(process.env.NEXT_PUBLIC_serverDomain + '/posts/all?offset=' + postsList.length);
    const newPosts = await res.json();
    return newPosts;
  }



  return (
    <>
      <Header loggedIn={props.loggedIn} username={props.username} />



      <Container >
        <Stack paddingY={4} spacing={3}>
          {postsList}
          <ArrowButton onClick={async () => {
            const newposts = await getNextPage();
            setCurrentPosts(currentPosts.concat(newposts));
          }} />
        </Stack>
      </Container>
    </>
  )
}
