import {
  MenuItem,
  Box,
  Typography,
  FormControl,
  Select,
  Button,
  Tooltip,
  Avatar,
  IconButton,
  Menu,
  SelectChangeEvent
} from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import { useGroup } from "../store/GroupContext";
import { useAuth } from "../auth/useAuth";
import { UserGroup } from "@putiikki/group";
import { useEffect, useState } from "react";

interface GroupSelectMenuProps {
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}

export const ProfileMenu = ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu
}: GroupSelectMenuProps) => {
  const { setGroup, group, userPoints } = useGroup();
  const { currentUser, logout } = useAuth();
  const userGroups = currentUser.groups || [];
  const [selectGroup, setSelectGroup] = useState('');

  useEffect(() => {
    if (userGroups.length > 0 && !selectGroup) {
      setSelectGroup(group.uuid);
    }
  }, [userGroups, selectGroup, setGroup]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectGroup(value);
    const selectedGroup = userGroups?.find((group: UserGroup) => group.uuid === value);
    selectedGroup && setGroup(selectedGroup);
  };

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <Tooltip title="Avaa käyttäjävalikko">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="user" src="/public/potted-plant.png" sx={{ bgcolor: "#f5f5f5" }} />
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
        <MenuItem sx={{ cursor: 'default' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' fontFamily={'Lobster Two'}>Hei {currentUser.name}!</Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Typography variant='body1'>Pistetilanne: {userPoints}</Typography>
        </MenuItem>
        <MenuItem>
          <FormControl sx={[{ width: '100%' }]}>
            <Select
              labelId="group-select-label"
              id="group-select"
              label="Ryhmä"
              value={selectGroup || ''}
              onChange={handleChange}
              variant='standard'
              startAdornment={<GroupsIcon color="primary" />}
              fullWidth
              inputProps={{ sx: { ml: 2, fontWeight: 'bold', color: 'primary.main' } }}
            >
              {userGroups?.map((group: UserGroup) => (
                <MenuItem value={group.uuid} key={group.uuid}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem sx={{ mt: 5 }}>
          <Button onClick={handleLogout}>Poistu</Button>
        </MenuItem>
      </Menu>
    </>
  );
};