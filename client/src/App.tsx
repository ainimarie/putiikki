import { Container, Box, Typography, Link, AppBar, Button, Toolbar } from "@mui/material";
import { Routes, Route, Outlet, Link as RouterLink } from "react-router";
import { Tasks } from './Tasks';
import { Shop } from './Shop';
import putiikkiLogo from './assets/shop.svg';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="shop" element={<Shop />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

const routes = [{ to: '/', name: 'Koti' }, { to: '/tasks', name: 'Tehtävät' }, { to: '/shop', name: 'Kauppa' }]

function Layout() {
  return (
    <>
      <AppBar variant="outlined">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {routes.map(route =>
              <Button
                key={route.name}
                variant='outlined'
                size='large'
                component={RouterLink}
                sx={{ my: 2, color: 'white', display: 'block' }}
                to={route.to}
              >
                {route.name}
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar >
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

function Home() {
  return (
    <Box sx={{ textAlign: 'center', my: '20vh' }}>
      <img src={putiikkiLogo} style={{ maxHeight: 150 }} />
      <Typography variant='h1' fontFamily='Lobster Two'>Putiikki</Typography>
      <Typography variant='caption'>Pieni palkintokauppa</Typography>
    </Box >
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link component={RouterLink} to="/">Go to the home page</Link>
      </p>
    </div>
  );
}