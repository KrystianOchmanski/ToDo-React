import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "../Models/Task";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5047/Task")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <>
      <Card>
        <CardHeader title="Task List"></CardHeader>
        <CardContent>
          <List>
            {tasks.map((task) => {
              return (
                <ListItemButton key={task.id}>
                  <ListItemText
                    primary={task.title}
                    secondary={task.endDate ? task.endDate.toString() : ""}
                  ></ListItemText>
                </ListItemButton>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
