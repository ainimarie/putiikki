import { Container, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { Navigation } from "./Navigation";


export const HomeLayout: React.FC = () => {

  return (
    <>
      <Navigation />
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
