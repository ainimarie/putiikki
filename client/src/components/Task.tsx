import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardContent } from '@mui/material';

type Task = {
  name: string,
  price: number,
  description?: string
}

interface TaskProps {
  task: Task;
}

export const Task: React.FC<TaskProps> = ({ task }) => {

  return (
    <Card variant="outlined" sx={{ maxWidth: 360, margin: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {task.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {task.price} p.
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined'>Tee</Button>
      </CardActions>
    </Card>
  );
}
