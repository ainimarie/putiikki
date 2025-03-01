import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Item } from "./components/Item";
import { useAuth } from "./auth/useAuth";
import { Severity, useNotification } from "./store/NotificationContext";
import { Loading } from "./layout/Loading";

type Item = {
  name: string,
  price: number,
  description?: string
}

const API_URL = import.meta.env.VITE_API_URL;

export const Penalties = () => {

  const [penalties, setPenalties] = useState([]);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [penaltiesLoading, setPenaltiesLoading] = useState<boolean>(false);
  const { openNotification } = useNotification();
  const { currentUser, setCurrentUser } = useAuth();

  const getPenalty = async (penaltyPoints: number) => {
    if (currentUser !== null) {
      setPurchaseLoading(true);
      await axios.post(`${API_URL}/transactions`, { user: currentUser.name, points: -penaltyPoints })
        .then(response => {
          if (response.data === 'ok')
            openNotification({ message: `Menetit ${penaltyPoints} pistettä!`, severity: Severity.Error })
          setCurrentUser({ ...currentUser, points: currentUser.points - penaltyPoints });
        })
        .catch(error => openNotification({ message: error.message, severity: Severity.Error }))
        .finally(() => setPurchaseLoading(false));
    }
  }

  const fetchPenalties = async () => {
    setPenaltiesLoading(true);
    await axios.get(`${API_URL}/penalties`)
      .then(response =>
        setPenalties(response.data)
      )
      .catch(_error => { throw new Error("Failed to fetch penalties") })
      .finally(() => setPenaltiesLoading(false));
  }

  useEffect(() => {
    fetchPenalties()
  }, [])

  if (penaltiesLoading) return <Loading />

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
              isLoading={purchaseLoading}
              isPenalty
            />
          </Grid>
        )
      })}
    </Grid>
  );
}
