import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router";
import putiikkiLogo from './../assets/shop.svg';

export const EmptyLayout = () => {

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ textAlign: 'center', my: '10vh' }}>
        <img src={putiikkiLogo} style={{ maxHeight: 150 }} />
        <Typography variant='h1' fontFamily='Lobster Two'>Putiikki</Typography>
        <Typography variant='caption'>Pieni palkintokauppa</Typography>
      </Box >
      <Outlet />
    </Container>
  );
}
