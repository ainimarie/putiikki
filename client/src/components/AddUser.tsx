import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardContent, FormControl, FormControlLabel, MenuItem, Paper, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
// import axios from 'axios';
import { Severity, useNotification } from '../store/NotificationContext';

// const API_URL = import.meta.env.VITE_API_URL;

type Group = {
  name: string,
  description?: string;
}

interface Props {
  isDialog?: boolean;
  close?: (cl: boolean) => void;
  isGroup?: boolean;
}


// TODO: Finish this component  (￣▽￣)"
export const AddUser: React.FC<Props> = ({ isDialog, close }) => {
  const { openNotification } = useNotification();

  const initialValues: Group = {
    name: '',
    description: ''
  }

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [inputs, setInputs] = useState<Group>(initialValues);
  const [addMany, setAddMany] = useState<boolean>(false);

  const handleSwitchChange = () => {
    setAddMany(!addMany)
  }


  const handleChange = (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = async () => {
    // TODO
    // const url = isAddUser || isAddGroup

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, 1000);
    setIsSubmitting(false);

    // await axios.post(`${API_URL}/${url}`, { name: inputs.name, price: inputs.price, description: inputs.description })
    //   .then(response => {
    //     if (response.data === 'ok')
    //       openNotification({
    //         message: 'Lisätty', severity: Severity.Success
    //       })
    //     else
    //       openNotification({
    //         message: 'Jokin meni pieleen', severity: Severity.Error
    //       })
    //     setInputs(initialValues)
    //     if ((isDialog && close !== undefined) && !addMany) {
    //       close(true);
    //     }
    //   })
    //   .catch(error => openNotification({ message: error.message, severity: Severity.Error }))
    //   .finally(() => setIsSubmitting(false))

  }

  return (
    <Paper>
      <CardContent sx={{ minHeight: '92px' }}>

        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
        >
          <TextField
            id="outlined-basic"
            name="name"
            label="Ryhmän nimi"
            onChange={handleChange}
            value={inputs.name || ''}
            sx={{ mb: 1 }}
            fullWidth
            variant='standard'
          />

        </Stack>

        <TextField
          fullWidth
          id="outlined-basic"
          multiline
          rows={4}
          name="description"
          label="Kuvaus"
          variant='standard'
          onChange={handleChange}
          value={inputs.description}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button size="small" variant='outlined' onClick={handleSubmit} disabled={isSubmitting}>Lisää</Button>
        <Button size="small" variant='outlined' onClick={close}>Peruuta</Button>
      </CardActions>
    </Paper >
  );
}
