import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Reward } from "./components/Reward";
import { useAuth } from "./auth/useAuth";

type Reward = {
  name: string,
  price: number,
  description?: string
}

export const Shop = () => {

  const [rewards, setRewards] = useState([]);

  const { currentUser, setCurrentUser } = useAuth();


  const buyReward = async (rewardPoints: number) => {
    if (currentUser !== null) {      // Update databas
      await axios.post('http://localhost:3000/transactions', { user: currentUser.name, points: -rewardPoints })
        .then(response => {
          if (response.data === 'ok')
            setCurrentUser({ ...currentUser, points: currentUser.points - rewardPoints });
        })
        .catch(error => console.log(error));
    }
  }


  const fetchRewards = async () => await axios.get('http://localhost:3000/rewards')
    .then(response =>
      setRewards(response.data)
    )
    .catch(error => console.log(error))

  // const updatePoints = async () => await axios.post('http://localhost:3000/transactions', { name: currentUser.name, points: currentUser.points })
  //   .then(response =>
  //     setRewards(response.data)
  //   )
  //   .catch(error => console.log(error))

  useEffect(() => {
    fetchRewards()
  }, [])

  return (
    <Grid container direction="row"
      columns={{ xs: 1, sm: 8, md: 8 }}
      sx={{
        alignItems: "stretch",
      }}>
      {rewards.length > 0 && rewards.map((item: Reward, index: number) => {
        return (
          <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`}>
            <Reward reward={item} key={`reward-${index}`} handlePoints={(points: number) => buyReward(points)} />
          </Grid>)
      })}

    </Grid>
  );
}