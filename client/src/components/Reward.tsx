import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardContent } from '@mui/material';

type Reward = {
  name: string,
  price: number,
  description: string
}

interface RewardProps {
  reward: Reward;
}

export const Reward: React.FC<RewardProps> = ({ reward }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 360, margin: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {reward.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {reward.price} p.
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {reward.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined'>Osta</Button>
      </CardActions>
    </Card>
  );
}
