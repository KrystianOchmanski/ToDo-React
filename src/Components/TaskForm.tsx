import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "../Models/Task";

type TaskFormProps = {
  task?: Task;
  onSubmit: (task: Task) => void;
  submitBtnText: string;
  close: () => void;
};

export const TaskForm = ({
  task,
  onSubmit,
  submitBtnText,
  close,
}: TaskFormProps) => {
  const [localTask, setTask] = useState<Task>(new Task(0, "", false, false));

  useEffect(() => {
    if (task) setTask(task);
  }, [task]);

  function change(e: ChangeEvent<HTMLInputElement>): void {
    let { name, value, type, checked } = e.target as HTMLInputElement;
    setTask({ ...localTask, [name]: type === "checkbox" ? checked : value });
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit(localTask);
  }

  return (
    <form onSubmit={submitHandler}>
      <FormGroup>
        <FormLabel>Title</FormLabel>
        <TextField
          title="Title"
          name="title"
          value={localTask.title}
          onChange={change}
        ></TextField>
      </FormGroup>
      <FormGroup>
        <FormLabel>Due Date</FormLabel>
        <TextField
          type="date"
          name="endDate"
          value={localTask.endDate || ""}
          onChange={change}
        ></TextField>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="isImportant"
              checked={localTask.isImportant}
              onChange={change}
            ></Checkbox>
          }
          label="Important"
        ></FormControlLabel>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="isCompleted"
              checked={localTask.isCompleted}
              onChange={change}
            ></Checkbox>
          }
          label="Completed"
        ></FormControlLabel>
      </FormGroup>
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ marginRight: 2 }}
      >
        {submitBtnText}
      </Button>
      <Button variant="outlined" color="error" onClick={close}>
        Close
      </Button>
    </form>
  );
};
