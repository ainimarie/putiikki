import { Copyright } from "@mui/icons-material";
import { Container, Box, Typography, Link, Grid2 as Grid, AppBar, Button, Toolbar } from "@mui/material";
import { Routes, Route, Outlet, Link as RouterLink } from "react-router";
import { Reward } from "./components/Reward";


const data = [
  {
    name: 'Uimahalli',
    price: 100,
    description: 'Käydään uimahallissa viikon sisään'
  },
  {
    name: 'Lisäpeliaika',
    price: 5,
    description: '30min lisää peliaikaa'
  },
  {
    name: 'Kirppis',
    price: 50,
    description: 'Kirppiskäynti ja 5€ kirppisrahaa'
  },
  {
    name: 'Jotain hupsua',
    price: 5,
    description: 'Yllätys'
  },
  {
    name: 'Uimahalli',
    price: 100,
    description: 'Käydään uimahallissa viikon sisään'
  },
  {
    name: 'Uimahalli',
    price: 100,
    description: 'Käydään uimahallissa viikon sisään'
  },
  {
    name: 'Uimahalli',
    price: 100,
    description: 'Käydään uimahallissa viikon sisään'
  },
]

export default function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
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

const routes = [{ to: '/', name: 'Koti' }, { to: '/shop', name: 'Kauppa' }, { to: '/nothing', name: 'Nothing' }]

function Layout() {
  return (
    <>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {routes.map(route =>
              <Button
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
      </AppBar>

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

function Shop() {
  return (
    // <Box sx={{ flexGrow: 1 }} >
    <Grid container direction="row"
      sx={{
        alignItems: "stretch",
      }}>
      {data.map((item, index) =>
        <Grid size={4}>
          <Reward reward={item} key={`reward-${index}`} />
        </Grid>)}

    </Grid>
    // </Box>
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