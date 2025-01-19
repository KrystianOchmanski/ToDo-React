import { Card, CardContent, CardHeader } from "@mui/material";
import { Task } from "../Models/Task";
import { TaskForm } from "./TaskForm";
import { updateTask } from "../Services/TaskService";

type TaskDetailsProps = {
  task: Task;
  submit: () => void;
  close: () => void;
};

export const TaskDetails = ({ task, submit, close }: TaskDetailsProps) => {
  async function submitHandler(task: Task): Promise<void> {
    await updateTask(task);
    submit();
  }

  return (
    <Card>
      <CardHeader title="Task Details"></CardHeader>
      <CardContent>
        <TaskForm
          task={task}
          onSubmit={submitHandler}
          submitBtnText="Edit"
          close={close}
        ></TaskForm>
      </CardContent>
    </Card>
  );
};
