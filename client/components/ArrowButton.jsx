import { Box } from "@mui/material";

export default function ArrowButton(props) {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box borderRadius={'50%'} height={'60px'} width={'60px'} bgcolor={'lightblue'} border={"solid black"}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={props.onClick}>
        <img src="/chevron.svg" height={'70%'}></img>
      </Box>
    </Box>
  );
}