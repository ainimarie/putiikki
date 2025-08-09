import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { ItemCard } from "./components/ItemCard";
import { useAuth } from "./auth/useAuth";
import { Severity, useNotification } from "./store/NotificationContext";
import { Loading } from "./layout/Loading";
import { Item } from '@putiikki/item'
import { useGroup } from "./store/GroupContext";


const API_URL = import.meta.env.VITE_API_URL;

export const Tasks = () => {

  const { currentUser } = useAuth();
  const { updateUserPoints, group } = useGroup();
  const { openNotification } = useNotification();
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);

  const doTask = async (rewardPoints: number, uuid: string) => {
    if (currentUser !== null) {
      setPurchaseLoading(true);

      await updateUserPoints(rewardPoints, 'task', uuid)
        .then(response => {
          if (response.data === 'ok')
            openNotification({
              message: `Ansaitsit ${rewardPoints} pistettä!`, severity: Severity.Success
            })
        })
        .catch(error => openNotification({ message: error.message, severity: Severity.Error }))
        .finally(() => setPurchaseLoading(false));
    }
  }

  const fetchTasks = async () => {
    setTasksLoading(true);
    await axios.get(`${API_URL}/groups/${group.uuid}/tasks`)
      .then(response =>
        setTasks(response.data)
      )
      .catch(_error => { throw new Error("Failed to fetch tasks") })
      .finally(() => setTasksLoading(false));
  }
  useEffect(() => {
    fetchTasks()
  }, [group])

  if (tasksLoading) return <Loading />

  return (
    <Grid container direction="row"
      columns={{ xs: 1, sm: 8, md: 8 }}
      sx={{
        alignItems: "stretch",
      }}>
      {tasks.length > 0
        ? tasks.map((task: Item, index: number) => {
          return (
            <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`}>
              <ItemCard
                item={task}
                key={`task-${index}`}
                handlePoints={(points: number) => doTask(points, task.uuid)}
                buttonTitle='Tee'
                isLoading={purchaseLoading}
              />
            </Grid>
          )
        })
        : <>Ei tehtäviä tällä hetkellä</>}
    </Grid>
  );
}
