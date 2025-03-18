import { Box, Typography, Link } from "@mui/material";
import { Navigate, Route, Link as RouterLink, createBrowserRouter, createRoutesFromElements, useOutlet } from "react-router";
import { Tasks } from './Tasks';
import { Shop } from './Shop';
import { HomeLayout } from "./layout/HomeLayout";
import { Login } from "./auth/Login";
import { EmptyLayout } from "./layout/EmptyLayout";
import { AuthProvider, useAuth } from "./auth/useAuth";
import { Penalties } from "./Penalties";
import { AddItem } from "./components/AddItem";
import { Home } from "./Home";
import { SelectGroup } from "./SelectGroup";
import { GroupProvider } from "./store/GroupContext";



export const AuthLayout = () => {
  const outlet = useOutlet();

  return (
    <AuthProvider>{outlet}</AuthProvider>
  );
};

const GroupLayout = () => {
  const outlet = useOutlet();

  return (
    <GroupProvider>{outlet}</GroupProvider>
  )
}

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

// TODO: Check the authlayout logic, move routes to own folder
export const router = createBrowserRouter(createRoutesFromElements
  (
    <Route
      element={<AuthLayout />}
    >
      <Route element={<GroupLayout />}>
        <Route element={<EmptyLayout />} >
          <Route path="/" element={<Login />} />
          <Route path="/groups" element={<ProtectedRoute><SelectGroup /></ProtectedRoute>} />
        </Route>

        <Route element={<ProtectedRoute><HomeLayout /></ProtectedRoute>} >
          <Route path='dashboard' element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="penalties" element={<Penalties />} />
          <Route path="shop" element={<Shop />} />
          <Route path="add" element={<AddItem />} />
          <Route path="*" element={<NoMatch />} />
        </Route >
      </Route>
    </Route>
  )
);

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