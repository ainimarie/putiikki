import { Box, Button, Dialog, DialogTitle, FormControl, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useAuth } from "./auth/useAuth";
import { Add } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { AddUser } from "./components/AddUser";
import { useGroup } from "./store/GroupContext";

export function Home() {
  const { currentUser } = useAuth();
  const { group, setGroup } = useGroup();

  const userGroups = currentUser.group;
  const [selectGroup, setSelectGroup] = useState('');

  const handleChange = (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSelectGroup(value)
  }

  const handleClick = () => {
    const selectedGroup = userGroups?.find(group => group.uuid === selectGroup)
    selectedGroup !== undefined && setGroup(selectedGroup)
  }

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenNew = () => {
    setDialogOpen(true);
  };
  const handleCloseNew = () => {
    setDialogOpen(false);
  };



  return (
    <Box>
      {/* TODO: Add logic if no group, show add group, if group show group members*/}
      <Paper
        variant="outlined"
        sx={{ padding: 2 }}
      >
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={handleOpenNew}
        >
          Luo ryhmä
        </Button>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseNew}
        >
          <DialogTitle >Lisää uusi</DialogTitle>
          <AddUser isDialog close={handleCloseNew} />
        </Dialog >



        <>
          <Typography component="div" variant="caption" gutterBottom>Ryhmä:</Typography>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Ryhmä"
              value={selectGroup || ''}
              onChange={handleChange}
              variant='standard'
            >
              {userGroups?.map(group => (<MenuItem value={group.uuid}>{group.name}</MenuItem>))}
            </Select>
            <Button
              onClick={handleClick}
              variant="outlined"
            >
              Valitse
            </Button>
          </FormControl>
        </>

      </Paper>
      <Typography><strong>Ryhmäsi:</strong>{group.name}</Typography>
    </Box >
  );
}