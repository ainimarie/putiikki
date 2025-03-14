import { Button, Container, Stack, TextField, Link, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import ForwardIcon from '@mui/icons-material/Forward';
import { useAuth } from "./useAuth";
import { Link as RouterLink, useSearchParams } from "react-router";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { AuthData } from "@putiikki/user";

export const Login: React.FC = () => {
  const { login, signup } = useAuth();
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get('mode') === 'signup';
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [userParams, setUserParams] = useState<AuthData>({
    username: '',
    password: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Add cute graphic
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!isSignup) {
      await login(userParams)
        .finally(() => setIsSubmitting(false));
    } else {
      await signup(userParams, name)
        .finally(() => setIsSubmitting(false));
    }
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
        <TextField
          id="outlined-basic"
          label="käyttäjänimesi "
          variant="outlined"
          sx={{ alignSelf: 'center', minWidth: { sm: '285px' } }}
          onChange={(e) => setUserParams({ ...userParams, username: e.target.value })}
          value={userParams.username}
        />
        <TextField
          id="outlined-basic"
          label="salasanasi"
          variant="outlined"
          onChange={(e) => setUserParams({ ...userParams, password: e.target.value })}
          value={userParams.password}
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  color="primary"
                >
                  {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            }
          }}
          sx={{ alignSelf: 'center', minWidth: { sm: '285px' } }}
        />
        {isSignup && <TextField
          id="outlined-basic"
          label="Kerro vielä nimesi"
          variant="outlined"
          sx={{ alignSelf: 'center', minWidth: { sm: '285px' } }}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />}
        <Button
          variant='contained'
          type='submit'
          endIcon={<ForwardIcon />}
          sx={{ maxWidth: { sm: '175px' }, alignSelf: 'center' }}
          fullWidth
          disabled={isSubmitting}
        >
          {isSignup ? "Rekisteröidään" : "Mennään"}
        </Button>
        <Link to={`?mode=${isSignup ? 'login' : 'signup'}`} component={RouterLink} sx={{ alignSelf: 'center' }} variant="caption">
          {isSignup ? 'Kirjaudu' : 'Rekisteröidy'}
        </Link>
      </Stack >

    </Container >
  )
}