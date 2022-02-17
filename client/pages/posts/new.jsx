import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function NewPost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async function (e) {
    const res = await axios.post(process.env.NEXT_PUBLIC_serverDomain + '/posts/new', {
      title: title,
      content: content,
      userId: 1
    }, { withCredentials: true });
    console.log(res);

  }


  return (<>
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

      <Grid container component="form" maxWidth={'md'} rowSpacing={1} pt={2} sx={{ width: '100%' }}
        onSubmit={e => handleSubmit(e)}>
        <Grid item xs={12}>
          <Typography variant="h4">Make a new post!</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField name="title" label="Title" variant="outlined" fullWidth
            onChange={e => setTitle(e.target.value)} margin='normal'
            sx={{ bgcolor: 'common.white' }} autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField multiline rows={6} fullWidth name="content" label="Content" variant="outlined"
            onChange={e => setContent(e.target.value)} margin='normal'
            sx={{ bgcolor: 'common.white' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" type="submit" size="large" fullWidth>Submit Post</Button>
        </Grid>

      </Grid>
    </Container>
  </>);
}