import { Alert, Grid2 as Grid, Snackbar, SnackbarCloseReason } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Item } from "./components/Item";
import { useAuth } from "./auth/useAuth";

type Item = {
  name: string,
  price: number,
  description?: string
}

const API_URL = import.meta.env.VITE_API_URL;


export const Shop = () => {
  const [rewards, setRewards] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();

  const buyReward = async (rewardPoints: number) => {
    if (currentUser !== null) {
      if (rewardPoints >= currentUser.points) {
        // TODO: Add notification snackbar when they're done
        return;
      }
      await axios.post(`${API_URL}/transactions`, { user: currentUser.name, points: -rewardPoints })
        .then(response => {
          if (response.data === 'ok')
            setCurrentUser({ ...currentUser, points: currentUser.points - rewardPoints });
        })
        .catch(console.error);
    }
  }

  const fetchRewards = async () => await axios.get(`${API_URL}/rewards`)
    .then(response =>
      setRewards(response.data)
    )
    .catch(console.error);

  useEffect(() => {
    fetchRewards()
  }, [])

  return (
    <>
      <Grid container direction="row"
        columns={{ xs: 1, sm: 8, md: 8 }}
        sx={{
          alignItems: "stretch",
        }}>

        {rewards.length > 0 && rewards.map((reward: Item, index: number) => {
          return (
            <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`} >
              <Item
                item={reward}
                key={`reward-${index}`}
                handlePoints={(points: number) => buyReward(points)}
                buttonTitle='Osta'
              />
            </Grid>
          )
        })}
      </Grid >
    </>
  );
}
