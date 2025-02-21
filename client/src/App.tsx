import { Box, Typography, Link } from "@mui/material";
import { Routes, Route, Link as RouterLink } from "react-router";
import { Tasks } from './Tasks';
import { Shop } from './Shop';
import putiikkiLogo from './assets/shop.svg';
import { Layout } from "./layout/Layout";


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