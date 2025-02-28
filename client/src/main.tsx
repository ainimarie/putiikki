import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from "react-router";
import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';
import '@fontsource/lobster-two/400.css';
import { router } from './App.tsx'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme.tsx';
import { NotificationProvider } from './store/NotificationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode >,
)
