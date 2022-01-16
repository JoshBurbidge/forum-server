import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";


export default function NewPost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");



  return (<>
    <Header />
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

      <Box component="form" maxWidth={'md'} sx={{ width: '100%' }}>
        <Typography py={3} variant="h4">
          Make a new post!
        </Typography>
        <TextField name="title" label="Title" variant="outlined"
          onChange={e => setTitle(e.target.value)} margin='normal'
          sx={{ width: '50%' }}
        />

        <TextField multiline rows={6} fullWidth name="content" label="Content" variant="outlined"
          onChange={e => setContent(e.target.value)} margin='normal'
        />

      </Box>
    </Container>
  </>);
}