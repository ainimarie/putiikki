import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ForwardIcon from '@mui/icons-material/Forward';
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";


type User = {
  name: string,
  points: number
}

interface LoginProps {
  user?: User;
}

export const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');


  // Add loading logic and cute graphic
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username);
    navigate('/dashboard');

  };

  return (
    <Container maxWidth="sm" sx={{ my: 4, justifyContent: 'center' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ '& > :not(style)': { m: 1 }, display: 'flex' }}
        noValidate
        autoComplete="off"
      >
        <Typography variant='h5' sx={{ alignSelf: 'center' }}>Moikka</Typography>
        <TextField id="outlined-basic" label="nimesi" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
        <Typography variant='h5' sx={{ alignSelf: 'center' }}>!</Typography>
        <Button variant='contained' type='submit' endIcon={<ForwardIcon />}>Mennään</Button>
      </Box >
    </Container>
  )
}