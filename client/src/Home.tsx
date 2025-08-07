import { Box, Button, Dialog, DialogTitle, Paper, Stack, Typography } from "@mui/material";

import { Add } from "@mui/icons-material";
import { useState } from "react";
import { AddUser } from "./components/AddUser";
import { useGroup } from "./store/GroupContext";

export function Home() {
  const { group } = useGroup();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenNew = () => {
    setDialogOpen(true);
  };
  const handleCloseNew = () => {
    setDialogOpen(false);
  };

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