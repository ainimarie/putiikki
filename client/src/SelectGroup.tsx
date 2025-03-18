import { Button, Container, Dialog, DialogTitle, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { useAuth } from "./auth/useAuth";
import { Add } from "@mui/icons-material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AddUser } from "./components/AddUser";
import { useNavigate } from "react-router";
import { useGroup } from "./store/GroupContext";

export const SelectGroup: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { setGroup } = useGroup();
  const userGroups = currentUser.group;
  const [selectGroup, setSelectGroup] = useState('');


  useEffect(() => {
    if (userGroups && userGroups.length === 1) {
      navigate("/dashboard");
    }
  }, []);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenNew = () => {
    setDialogOpen(true);
  };
  const handleCloseNew = () => {
    setDialogOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSelectGroup(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedGroup = userGroups?.find(group => group.uuid === selectGroup)
    selectedGroup !== undefined && setGroup(selectedGroup)
    navigate("/dashboard");

  }

  return (
    <Container maxWidth="xs" sx={{ my: 4, justifyContent: 'center', alignContent: 'center' }}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ '& > :not(style)': { m: 1 }, display: 'flex' }}
        noValidate
        autoComplete="off"
      >
        {userGroups &&
          <>
            <Typography component="div" variant="caption" gutterBottom>Ryhmä:</Typography>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Ryhmä"
                value={selectGroup || ''}
                onChange={handleChange}
                variant='standard'
              >
                {userGroups.map(group => (<MenuItem value={group.uuid}>{group.name}</MenuItem>))}
              </Select>
              <Button
                type="submit"
                variant="outlined"
              >
                Valitse
              </Button>
            </FormControl>
          </>
        }
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={handleOpenNew}
        >
          Luo Uusi
        </Button>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseNew}
        >
          <DialogTitle >Lisää uusi</DialogTitle>
          {/* ADDGROUP */}
          <AddUser isDialog close={handleCloseNew} />
        </Dialog >
      </Stack>
    </Container >
  );
}
