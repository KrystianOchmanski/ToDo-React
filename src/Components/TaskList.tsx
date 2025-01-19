import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "../Models/Task";
import { CreateTask } from "./CreateTask";
import { CreateTaskDTO } from "../Models/CreateTaskDTO";
import { addTask, getTasks } from "../Services/TaskService";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateFormShown, setCreateForm] = useState<boolean>(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    let tasks = await getTasks();
    setTasks(tasks);
  }

  function showCreateForm(): void {
    setCreateForm(true);
  }

  function createTaskClosed(): void {
    setCreateForm(false);
  }

  async function handleAddTask(task: CreateTaskDTO): Promise<void> {
    await addTask(task);
    loadTasks();
  }

  return (
    <>
      <Card>
        <CardHeader
          title="Task List"
          action={
            <Button
              variant="contained"
              onClick={showCreateForm}
              disabled={isCreateFormShown}
            >
              Add task
            </Button>
          }
        ></CardHeader>
        <CardContent>
          {isCreateFormShown && (
            <CreateTask
              taskCreated={handleAddTask}
              close={createTaskClosed}
            ></CreateTask>
          )}
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
