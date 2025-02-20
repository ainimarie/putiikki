import axios from 'axios';
import { Container, Box, Typography, Link, Grid2 as Grid, AppBar, Button, Toolbar } from "@mui/material";
import { Routes, Route, Outlet, Link as RouterLink } from "react-router";
import { Reward } from "./components/Reward";
import { useEffect, useState } from 'react';


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


type Task = {
  name: string,
  price: number,
  description?: string
}



const Shop = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => await axios.get('http://localhost:3000/tasks')
    .then(response =>
      setTasks(response.data)
    )
    .catch(error => console.log(error))

  useEffect(() => {
    fetchTasks()
  }, [])

  console.log(tasks, tasks.length)

  return (
    // <Box sx={{ flexGrow: 1 }} >
    <Grid container direction="row"
      sx={{
        alignItems: "stretch",
      }}>
      {tasks.length > 0 && tasks.map((item: Task, index: number) => {
        console.log("moika?")
        return (<Grid size={4}>
          <Reward reward={item} key={`reward-${index}`} />
        </Grid>)
      })}

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