import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ForwardIcon from '@mui/icons-material/Forward';
import { useAuth } from "./useAuth";

type User = {
  name: string,
  points: number
}

interface LoginProps {
  user?: User;
}

export const Login: React.FC<LoginProps> = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  // Add loading logic and cute graphic
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await login(username)
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4, justifyContent: 'center', alignContent: 'center' }}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ '& > :not(style)': { m: 1 }, display: 'flex' }}
        noValidate
        autoComplete="off"
      >
        <Stack direction='row' spacing={1} sx={{ justifyContent: 'center' }}>
          <Typography variant='h5' sx={{ alignSelf: 'center' }}>Moikka</Typography>
          <TextField id="outlined-basic" label="nimesi" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
          <Typography variant='h5' sx={{ alignSelf: 'center' }}>!</Typography>
        </Stack>
        <Button
          variant='contained'
          type='submit'
          endIcon={<ForwardIcon />}
          sx={{ maxWidth: { sm: '150px' }, alignSelf: 'center' }}
          fullWidth
          disabled={isSubmitting}
        >
          Mennään
        </Button>
      </Stack >
    </Container >
  )
}