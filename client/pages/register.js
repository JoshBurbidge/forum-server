import { TextField, Stack, Grid, Box, Button } from "@mui/material";
import axios from 'axios';
import { useState } from "react";


export default function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit form')
    console.log({ username: user, password: pass })
    axios.post('http://localhost:3000/users/register', {
      username: user,
      password: pass
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>

      <Box height="100vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField name="username" id="outlined-basic" label="username" variant="outlined"
              onChange={e => setUser(e.target.value)} />
            <TextField name="password" id="outlined-basic" label="password" variant="outlined"
              onChange={e => setPass(e.target.value)} />
            <Button type="submit" variant="contained">Register</Button>
          </Stack>
        </form>
      </Box>
    </div>
  )
}