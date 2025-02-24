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

export const Tasks = () => {

  const { currentUser, setCurrentUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  const doTask = async (rewardPoints: number) => {
    if (currentUser !== null) {
      await axios.post('http://localhost:3000/transactions', { user: currentUser.name, points: rewardPoints })
        .then(response => {
          if (response.data === 'ok')
            setCurrentUser({ ...currentUser, points: currentUser.points + rewardPoints });
        })
        .catch(error => console.log(error));
    }
  }

  const fetchTasks = async () => await axios.get('http://localhost:3000/tasks')
    .then(response =>
      setTasks(response.data)
    )
    .catch(error => console.log(error))

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
            />
          </Grid>
        )
      })}
    </Grid>
  );
}
