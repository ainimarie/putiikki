import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Link,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import { AddItem } from "../components/AddItem";
import { useGroup } from "../store/GroupContext";
import { ProfileMenu } from "../components/ProfileMenu";

// TODO: Change var name
const routesNormal = [
  { to: '/dashboard', name: 'Koti' },
  { to: '/shop', name: 'Kauppa' },
];

const routesLeader = [
  { to: '/dashboard', name: 'Koti' },
  { to: '/tasks', name: 'Tehtävät' },
  { to: '/penalties', name: 'Rangaistukset' },
  { to: '/shop', name: 'Kauppa' },
  { to: '/add', name: 'Lisää uusi' }
];

export const Navigation = () => {
  const { userPoints, group } = useGroup();

  const routes = group.isLeader ? routesLeader : routesNormal;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenNew = () => {
    setDialogOpen(true);
  };
  const handleCloseNew = () => {
    setDialogOpen(false);
  };

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
    <AppBar variant="outlined" >
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
              {routes.map((route, index) => (
                <MenuItem key={`menuitem-${index}`} onClick={handleCloseNavMenu} >
                  <Link key={`menu-nav-${index}`} sx={{ textAlign: 'center' }} component={RouterLink} to={route.to}>{route.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map((route, index) => {
              if (route.to === '/add') {
                return (
                  <div key={`nav-${index}`}>
                    <Button
                      key={`nav-${index}`}
                      variant='outlined'
                      size='large'
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      onClick={handleOpenNew}>
                      Lisää
                    </Button>
                    <Dialog
                      open={dialogOpen}
                      onClose={handleCloseNew}
                    >
                      <DialogTitle >Lisää uusi</DialogTitle>
                      <AddItem isDialog close={handleCloseNew} />
                    </Dialog >
                  </div>)
              }
              else {
                return (<Button
                  key={`nav-${index}`}
                  variant='outlined'
                  size='large'
                  component={RouterLink}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  to={route.to}
                >
                  {route.name}
                </Button>)
              }
            })}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Typography
              variant='body1'
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                mr: 2,
                alignSelf: 'center'
              }}
            >
              {userPoints} pistettä
            </Typography>

            <ProfileMenu
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  )
};
