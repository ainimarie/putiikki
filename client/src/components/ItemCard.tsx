import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardContent } from '@mui/material';
import { Item } from '@putiikki/item'

interface ItemCard {
  item: Item;
  handlePoints: (points: number) => void;
  buttonTitle: string;
  isLoading: boolean;
  isPenalty?: boolean;
}

export const ItemCard: React.FC<ItemCard> = ({ item, handlePoints, isLoading, buttonTitle, isPenalty }) => {
  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent sx={{ minHeight: '92px' }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {isPenalty && "-"}
            {item.price} p.
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined' onClick={() => handlePoints(item.price)} disabled={isLoading}>
          {buttonTitle}
        </Button>
      </CardActions>
    </Card >
  );
}
