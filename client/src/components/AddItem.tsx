import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardContent, FormControl, FormControlLabel, Grid2 as Grid, MenuItem, Paper, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type AddItem = {
  type: 'reward' | 'task' | 'penalty',
  name: string,
  price: number,
  description?: string
}

const TYPE = {
  reward: 'Palkinto',
  penalty: 'Rangaistus',
  task: 'Tehtävä'
}

interface Props {
  isDialog?: boolean;
  close?: (cl: boolean) => void;
}

export const AddItem: React.FC<Props> = ({ isDialog, close }) => {

  const initialValues = {
    type: 'reward' as 'reward',
    name: '',
    price: 0,
    description: ''
  }

  const [inputs, setInputs] = useState<AddItem>(initialValues);
  const [addMany, setAddMany] = useState<boolean>(false);

  const handleSwitchChange = () => {
    setAddMany(!addMany)
  }


  const handleChange = (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = () => {
    setInputs(initialValues)
    if ((isDialog && close !== undefined) && !addMany) {
      close(true);
    }
    console.log(inputs)
  }

  return (
    <Paper>
      <CardContent sx={{ minHeight: '92px' }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          spacing={2}
        >
          <Typography component="div" gutterBottom>Tyyppi:</Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='type'
              value={inputs.type || ''}
              onChange={handleChange}
              variant='standard'
            >
              <MenuItem value={'reward'}>Palkinto</MenuItem>
              <MenuItem value={'task'}>Tehtävä</MenuItem>
              <MenuItem value={'penalty'}>Rangaistus</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
        >
          <TextField
            id="outlined-basic"
            name="name"
            label="Nimi"
            onChange={handleChange}
            value={inputs.name || ''}
            sx={{ mb: 1 }}
            fullWidth
            variant='standard'
          />
          <TextField
            id="outlined-basic"
            name="price"
            label="Pisteet"
            onChange={handleChange}
            value={inputs.price || ''}
            sx={{ maxWidth: '100px', mb: 1 }}
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
      <CardActions>
        <FormControlLabel control={<Switch checked={addMany} onChange={handleSwitchChange} />} label="Lisää monta" />
        <Button size="small" variant='outlined' onClick={handleSubmit}>Lisää {TYPE[inputs.type]}</Button>
      </CardActions>
    </Paper >
  );
}
