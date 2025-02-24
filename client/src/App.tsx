import { Box, Typography, Link } from "@mui/material";
import { Route, Link as RouterLink, createBrowserRouter, createRoutesFromElements, useOutlet } from "react-router";
import { Tasks } from './Tasks';
import { Shop } from './Shop';
import putiikkiLogo from './assets/shop.svg';
import { HomeLayout } from "./layout/HomeLayout";
import { Login } from "./auth/Login";
import { EmptyLayout } from "./layout/EmptyLayout";
import { AuthProvider, useAuth } from "./auth/useAuth";
import { Penalties } from "./Penalties";
import { AddItem } from "./components/AddItem";



export const AuthLayout = () => {
  const outlet = useOutlet();

  return (
    <AuthProvider>{outlet}</AuthProvider>
  );
};

// TODO: Check the authlayout logic, move routes to own folder
export const router = createBrowserRouter(createRoutesFromElements
  (
    <Route
      element={<AuthLayout />}
    >
      <Route element={<EmptyLayout />} >
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<HomeLayout />} >
        <Route path='dashboard' element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="penalties" element={<Penalties />} />
        <Route path="shop" element={<Shop />} />
        <Route path="add" element={<AddItem />} />
        <Route path="*" element={<NoMatch />} />
      </Route >
    </Route >
  )
);

function Home() {
  const { currentUser } = useAuth();
  return (
    <Box sx={{ textAlign: 'center', my: '20vh' }}>
      <img src={putiikkiLogo} style={{ maxHeight: 100 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography fontSize={30} mr={2} sx={{ alignSelf: 'flex-end' }}>Hei</Typography>
        <Typography variant='h3' fontFamily='Lobster Two'>{currentUser.name}</Typography>
        <Typography fontSize={30} ml={2} sx={{ alignSelf: 'flex-end' }}>(∩^o^)⊃━☆</Typography>
      </Box>
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