import { TextField, Box, Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useContext } from "react";
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie";
import { UserContext } from "../components/UserContext";


export default function Login(props) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState();
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies();


  const login = async () => {
    console.log({ username: username, password: pass })
    return await axios.post(process.env.NEXT_PUBLIC_serverDomain + '/users/login', {
      username: username,
      password: pass
    }, { withCredentials: true });
  }

  const handleSubmit = function (e) {
    e.preventDefault();
    login()
      .then(res => {
        console.log(res);
        const { username } = res.data.user
        setUser({ username: username, loggedIn: true });
        setCookie('test', 'abc');
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
      {/* <Button onClick={() => setUser({ username: "hello", loggedIn: true })}>change user</Button> */}
      <Box sx={{
        mt: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'common.white', borderRadius: 4, p: 4, boxShadow: 3
      }}>
        <Typography variant='h4'>
          Log in
        </Typography>
        <Box component="form" width='100%' sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
          onSubmit={(e) => handleSubmit(e)}>
          <TextField name="username" label="Username" variant="outlined"
            onChange={e => setUsername(e.target.value)} margin='normal'
            error={!!error} helperText={error} autoFocus />
          <TextField name="password" label="Password" variant="outlined"
            onChange={e => setPass(e.target.value)} margin='normal' type='password' error={!!error} />
          <Button type="submit" variant="contained" >Log In</Button>
        </Box>
      </Box>
    </Container >
  )
}