import { Box, Typography, Link } from "@mui/material";
import { Route, Link as RouterLink, createBrowserRouter, createRoutesFromElements, useOutlet } from "react-router";
import { Tasks } from './Tasks';
import { Shop } from './Shop';
import putiikkiLogo from './assets/shop.svg';
import { HomeLayout } from "./layout/HomeLayout";
import { Login } from "./auth/Login";
import { EmptyLayout } from "./layout/EmptyLayout";
import { AuthProvider } from "./auth/useAuth";



export const AuthLayout = () => {
  const outlet = useOutlet();

  return (
    <AuthProvider>{outlet}</AuthProvider>
  );
};

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(createRoutesFromElements
  (
    <Route
      element={<AuthLayout />}
      loader={() => getUserData()}
    >
      <Route element={<EmptyLayout />} >
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<HomeLayout />} >
        <Route path='dashboard' element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="shop" element={<Shop />} />
        <Route path="*" element={<NoMatch />} />
      </Route >
    </Route >)
);

function Home() {
  return (
    <Box sx={{ textAlign: 'center', my: '20vh' }}>
      <img src={putiikkiLogo} style={{ maxHeight: 150 }} />
      <Typography variant='h1' fontFamily='Lobster Two'>Putiikki</Typography>
      <Typography variant='caption'>Pieni palkintokauppa</Typography>
    </Box >
  );
}

function NoMatch() {
  return (
    <Box sx={{ textAlign: 'center', my: '20vh' }}>
      <Typography variant='h1' fontFamily='Lobster Two'>404</Typography>
      <Typography variant='caption'>Miten päädyit tänne?</Typography>
      <p>
        <Link component={RouterLink} to="/">Takaisin kotiin</Link>
      </p>
    </Box>
  );
}