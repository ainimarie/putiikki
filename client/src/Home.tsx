import { Box, Button, Dialog, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { useAuth } from "./auth/useAuth";
import { Add } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { AddUser } from "./components/AddUser";
import { useGroup } from "./store/GroupContext";
import { UserGroup } from "@putiikki/group";

export function Home() {
  const { currentUser } = useAuth();
  const { group, setGroup, userPoints } = useGroup();

  const userGroups = currentUser.groups;
  const [selectGroup, setSelectGroup] = useState('');

  const handleChange = (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSelectGroup(value)
  }

  const handleClick = () => {
    const selectedGroup = userGroups?.find((group: UserGroup) => group.uuid === selectGroup)
    selectedGroup !== undefined && setGroup(selectedGroup)
  }

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenNew = () => {
    setDialogOpen(true);
  };
  const handleCloseNew = () => {
    setDialogOpen(false);
  };
  console.log("asdasdasd", userPoints)
  return (
    <Box>
      {/* TODO: Add logic if no group, show add group, if group show group members
      Move to a separate "admin" layout and page
      */}
      <Paper
        variant="outlined"
        sx={{ padding: 2 }}
      >

        <Dialog
          open={dialogOpen}
          onClose={handleCloseNew}
        >
          <DialogTitle >Lisää uusi</DialogTitle>
          <AddUser isDialog close={handleCloseNew} />
        </Dialog >



        <Stack direction="column" spacing={2}>
          {/* <Typography component="div" variant="caption" gutterBottom>Ryhmä:</Typography> */}
          <FormControl>
            <InputLabel id="group-select-label">Ryhmä</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              label="Ryhmä"
              value={selectGroup || ''}
              onChange={handleChange}
              variant='standard'
            >
              {userGroups?.map((group: UserGroup) => (<MenuItem value={group.uuid}>{group.name}</MenuItem>))}
            </Select>
            <Button
              onClick={handleClick}
              variant="outlined"
            >
              Valitse
            </Button>
          </FormControl>
        </Stack>
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={handleOpenNew}
        >
          Luo ryhmä
        </Button>
      </Paper>

      {/* admin */}
      <Paper variant="outlined"
        sx={{ padding: 2 }}>
        <Typography variant="h5" fontFamily={'Lobster Two'}>{group.name}</Typography>
        <Stack>
          Ryhmän jäsenet:
          {/* TODO;: */}
          {/* {group && group.members?.map((member: User) => (<Typography>{member.username}</Typography>))} */}
        </Stack>
      </Paper>
    </Box >
  );
}