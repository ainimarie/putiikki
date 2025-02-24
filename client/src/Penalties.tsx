import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Item } from "./components/Item";
import { useAuth } from "./auth/useAuth";

type Item = {
  name: string,
  price: number,
  description?: string
}

export const Penalties = () => {

  const [penalties, setPenalties] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();

  const getPenalty = async (penaltyPoints: number) => {
    if (currentUser !== null) {
      await axios.post('http://localhost:3000/transactions', { user: currentUser.name, points: -penaltyPoints })
        .then(response => {
          if (response.data === 'ok')
            setCurrentUser({ ...currentUser, points: currentUser.points - penaltyPoints });
        })
        .catch(error => console.log(error));
    }
  }

  const fetchPenalties = async () => await axios.get('http://localhost:3000/penalties')
    .then(response =>
      setPenalties(response.data)
    )
    .catch(error => console.log(error))

  useEffect(() => {
    fetchPenalties()
  }, [])

  return (
    <Grid container direction="row"
      columns={{ xs: 1, sm: 8, md: 8 }}
      sx={{
        alignItems: "stretch",
      }}>
      {penalties.length > 0 && penalties.map((penalty: Item, index: number) => {
        return (
          <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`}>
            <Item
              item={penalty}
              key={`reward-${index}`}
              handlePoints={(points: number) => getPenalty(points)}
              buttonTitle='Vähennä'
              isPenalty
            />
          </Grid>
        )
      })}
    </Grid>
  );
}