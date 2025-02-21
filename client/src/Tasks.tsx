import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Task } from "./components/Task";

type Task = {
  name: string,
  price: number,
  description?: string
}

export const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => await axios.get('http://localhost:3000/tasks')
    .then(response =>
      setTasks(response.data)
    )
    .catch(error => console.log(error))

  useEffect(() => {
    fetchTasks()
  }, [])

  console.log(tasks, tasks.length)

  return (
    <Grid container direction="row"
      columns={{ xs: 1, sm: 8, md: 8 }}
      sx={{
        alignItems: "stretch",
      }}>
      {tasks.length > 0 && tasks.map((item: Task, index: number) => {
        return (
          <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`}>
            <Task task={item} key={`task-${index}`} />
          </Grid>)
      })}

    </Grid>
  );
}
