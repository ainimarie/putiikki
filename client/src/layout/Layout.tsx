import { AppBar, Container, Toolbar, Box, IconButton, Menu, MenuItem, Button, Link, Typography, Tooltip, Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';

const routes = [{ to: '/', name: 'Koti' }, { to: '/tasks', name: 'Tehtävät' }, { to: '/shop', name: 'Kauppa' }]

//TODO: user-settings menu
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export function Layout() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar variant="outlined">
        <Container maxWidth="lg">
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {routes.map((route) => (
                  <MenuItem key={route.name} onClick={handleCloseNavMenu} >
                    <Link sx={{ textAlign: 'center' }} component={RouterLink} to={route.to}>{route.name}</Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <Typography variant='body1' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 2, alignSelf: 'center' }} > 50 pistettä</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="user" src="/public/potted-plant.png" sx={{ bgcolor: grey.A100 }} />
                </IconButton>
              </Tooltip>
              <Menu
                slotProps={{ paper: { sx: { width: '400px' } } }}
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography variant='h5' fontFamily={'Lobster Two'}>Hei Käyttäjänimi!</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography variant='body1'>Pistetilanne:</Typography>
                </MenuItem>
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))} */}
              </Menu>
            </Box>
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