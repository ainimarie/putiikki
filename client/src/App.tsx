import { Container, Box, Typography, Link, AppBar, Button, Toolbar } from "@mui/material";
import { Routes, Route, Outlet, Link as RouterLink } from "react-router";
import { Tasks } from './Tasks';
import { Shop } from './Shop';


export default function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="shop" element={<Shop />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Typography>
      </Box>
    </Container>
  );
}

const routes = [{ to: '/', name: 'Koti' }, { to: '/tasks', name: 'Tehtävät' }, { to: '/shop', name: 'Kauppa' }, { to: '/nothing', name: 'Nothing' }]

function Layout() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
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

      <Outlet />

    </>
  );
}

function Home() {
  return (
    <div>
    </div>
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