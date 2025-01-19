import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Task } from "../Models/Task";
import { addTask } from "../Services/TaskService";
import { TaskForm } from "./TaskForm";
import { CheckCircle, Star } from "@mui/icons-material";

type TaskListProps = {
  tasks: Task[];
  selectTask: (task: Task) => void;
  taskChanged: () => void;
};

export function TaskList({ tasks, selectTask, taskChanged }: TaskListProps) {
  const [isCreateFormShown, setCreateForm] = useState<boolean>(false);

  function toggleCreateForm(): void {
    setCreateForm((prev) => !prev);
  }

  async function handleAddTask(task: Task): Promise<void> {
    await addTask(task);
    taskChanged();
  }

  return (
    <>
      <Card>
        <CardHeader
          title="Task List"
          action={
            <Button
              variant="contained"
              onClick={toggleCreateForm}
              disabled={isCreateFormShown}
            >
              Add task
            </Button>
          }
        ></CardHeader>
        <CardContent>
          <Collapse in={isCreateFormShown} timeout="auto" unmountOnExit>
            <TaskForm
              onSubmit={handleAddTask}
              submitBtnText="Add"
              close={toggleCreateForm}
            />
          </Collapse>
          <List>
            {tasks.map((task) => {
              return (
                <ListItemButton
                  key={task.id}
                  onClick={() => selectTask(task)}
                  sx={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                  }}
                >
                  <ListItemText
                    primary={
                      <>
                        {task.isImportant && (
                          <Star color="warning" fontSize="small" />
                        )}
                        {task.title}
                      </>
                    }
                    secondary={task.endDate ? task.endDate.toString() : ""}
                  />
                  {task.isCompleted && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </ListItemButton>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
