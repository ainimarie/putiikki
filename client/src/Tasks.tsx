import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Item } from "./components/Item";
import { useAuth } from "./auth/useAuth";
import { Severity, useNotification } from "./store/NotificationContext";

type Item = {
  name: string,
  price: number,
  description?: string
}

const API_URL = import.meta.env.VITE_API_URL;

export const Tasks = () => {

  const { currentUser, setCurrentUser } = useAuth();
  const { openNotification } = useNotification();
  const [tasks, setTasks] = useState([]);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);

  const doTask = async (rewardPoints: number) => {
    if (currentUser !== null) {
      setPurchaseLoading(true);
      await axios.post(`${API_URL}/transactions`, { user: currentUser.name, points: rewardPoints })
        .then(response => {
          if (response.data === 'ok')
            openNotification({
              message: `Ansaitsit ${rewardPoints} pistettä!`, severity: Severity.Success
            })
          setCurrentUser({ ...currentUser, points: currentUser.points + rewardPoints });
        })
        .catch(error => openNotification({ message: error.message, severity: Severity.Error }))
        .finally(() => setPurchaseLoading(false));
    }
  }

  const fetchTasks = async () => await axios.get(`${API_URL}/tasks`)
    .then(response =>
      setTasks(response.data)
    )
    .catch(console.error);

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <Grid container direction="row"
      columns={{ xs: 1, sm: 8, md: 8 }}
      sx={{
        alignItems: "stretch",
      }}>
      {tasks.length > 0 && tasks.map((task: Item, index: number) => {
        return (
          <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`}>
            <Item
              item={task}
              key={`task-${index}`}
              handlePoints={(points: number) => doTask(points)}
              buttonTitle='Tee'
              isLoading={purchaseLoading}
            />
          </Grid>
        )
      })}
    </Grid>
  );
}
