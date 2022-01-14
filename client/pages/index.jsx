import { Container, Stack, Typography } from '@mui/material'
import Post from '../components/Post';
import Header from '../components/Header';
import axios from 'axios'
import { getUserIdCookie } from '../util/cookie';


export async function getServerSideProps(ctx) {
  const url = process.env.NEXT_PUBLIC_serverDomain + "/posts/all";
  const postsRes = await fetch(url);
  const allPosts = await postsRes.json();

  const { req, res } = ctx;

  const meResponse = await axios.get(process.env.NEXT_PUBLIC_serverDomain + '/users/me', {
    withCredentials: true,
    headers: {
      cookie: getUserIdCookie(ctx)
    }
  });
  const { loggedIn, username } = meResponse.data;
  console.log(meResponse.data);

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

  const postsList = props.posts.map(post => {
    return <Post title={post.title} key={post.id} />
  });

  return (
    <>
      <Header loggedIn={props.loggedIn} username={props.username} />

      <Container >
        <Stack paddingTop={2} spacing={3}>
          {postsList}
        </Stack>
      </Container>
    </>
  )
}
