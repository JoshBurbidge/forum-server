import { TextField, Box, Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/router'


export default function Login(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState();
  const router = useRouter();


  const login = async () => {
    console.log({ username: user, password: pass })
    return await axios.post(process.env.NEXT_PUBLIC_serverDomain + '/users/login', {
      username: user,
      password: pass
    }, { withCredentials: true });
  }

  const handleSubmit = function (e) {
    e.preventDefault();
    login()
      .then(res => {
        console.log(res);
        router.push('/');
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.data) {
          const error = err.response.data.errors;
          setError(error.message);
        }
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
        <Typography variant='h4'>
          Log in
        </Typography>
        <Box component="form" width='100%' sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
          onSubmit={(e) => handleSubmit(e)}>
          <TextField name="username" label="Username" variant="outlined"
            onChange={e => setUser(e.target.value)} margin='normal'
            error={!!error} helperText={error} />
          <TextField name="password" label="Password" variant="outlined"
            onChange={e => setPass(e.target.value)} margin='normal' type='password' error={!!error} />
          <Button type="submit" variant="contained" >Log In</Button>
        </Box>
      </Box>
    </Container >
  )
}