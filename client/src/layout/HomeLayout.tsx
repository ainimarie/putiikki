import { Container, Toolbar } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth/useAuth";
import { Navigation } from "./Navigation";


export const HomeLayout: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

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
