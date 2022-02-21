import { TextField, Stack, Grid, Box, Button, CssBaseline, Container, Typography, createTheme, Link } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/router'



export default function Register(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [userError, setUserError] = useState();
  const [passError, setPassError] = useState();
  const router = useRouter();


  const registerUser = async () => {
    console.log({ username: user, password: pass })

    return await axios.post(process.env.NEXT_PUBLIC_serverDomain + '/users/register', {
      username: user,
      password: pass
    }, { withCredentials: true });
  }

  const handleSubmit = function (e) {
    e.preventDefault();
    registerUser()
      .then(res => {
        console.log(res);
        router.push('/');
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
  }

  return (

    <Container component='main' maxWidth="xs">
      <Box sx={{
        mt: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'common.white', borderRadius: 4, p: 4, boxShadow: 3
      }}>
        <Typography variant='h4'>
          Sign up
        </Typography>
        <Box component="form" width='100%' sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
          onSubmit={(e) => handleSubmit(e)}>
          <TextField name="username" label="Username" variant="outlined"
            onChange={e => setUser(e.target.value)} margin='normal'
            error={!!userError} helperText={userError} />
          <TextField name="password" label="Password" variant="outlined"
            onChange={e => setPass(e.target.value)} margin='normal' type='password'
            error={!!passError} helperText={passError} />
          <Button type="submit" variant="contained">Register</Button>
        </Box>
      </Box>

    </Container >
  )
}