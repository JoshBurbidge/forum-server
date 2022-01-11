import { TextField, Stack, Grid, Box, Button, CssBaseline, Container, Typography, createTheme, Link } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/router'
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

export async function getStaticProps() {
  return {
    props: { server: process.env.serverDomain }
  }
}

export default function Register(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [userError, setUserError] = useState();
  const [passError, setPassError] = useState();
  const router = useRouter();

  const register = async () => {
    console.log({ username: user, password: pass })
    // try {
    return await axios.post(props.server + '/users/register', {
      username: user,
      password: pass
    });
    //   return response;
    // } catch (e) {
    //   return e;
    // }
  }

  const login = () => {
    axios.post(props.server + '/users/login', { //not getting cookie
      username: user,
      password: pass
    })
      .then(res => {
        console.log(res)
        router.push('/');
      });
  }


  return (

    <Container component='main' maxWidth="xs">
      <Box sx={{
        mt: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component="form" width='100%' sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
          onSubmit={(e) => {
            e.preventDefault();
            register()
              .then(res => {
                console.log(res);
                axios.post(props.server + '/users/login', { //not getting cookie
                  username: user,
                  password: pass
                }, { withCredentials: true }) // had to add credentials due to cookie
                  .then(res => {
                    console.log(res)
                    router.push('/');
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
                if (err.response) {
                  const error = err.response.data.errors;
                  if (error.field === "username") {
                    setUserError(error.message);
                    setPassError("");
                  } else if (error.field === 'password') {
                    setPassError(error.message);
                    setUserError("");
                  }
                }
              });
          }}>
          <TextField name="username" label="Username" variant="outlined"
            onChange={e => setUser(e.target.value)} margin='normal'
            error={!!userError} helperText={userError} />
          <TextField name="password" label="Password" variant="outlined"
            onChange={e => setPass(e.target.value)} margin='normal' type='password'
            error={!!passError} helperText={passError} />
          <Button type="submit" variant="contained" >Register</Button>
        </Box>
      </Box>

    </Container >
  )
}