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
    // <Box sx={{ flexGrow: 1 }} >
    <Grid container direction="row"
      sx={{
        alignItems: "stretch",
      }}>
      {tasks.length > 0 && tasks.map((item: Task, index: number) => {
        return (<Grid size={4} key={`grid-${index}`}>
          <Task task={item} key={`task-${index}`} />
        </Grid>)
      })}

    </Grid>
    // </Box>
  );
}
