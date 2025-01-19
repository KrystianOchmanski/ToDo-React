import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { CreateTaskDTO } from "../Models/CreateTaskDTO";

type CreateTaskProps = {
  taskCreated: (task: CreateTaskDTO) => void;
  close: () => void;
};

export const CreateTask = ({ taskCreated, close }: CreateTaskProps) => {
  const [task, setTask] = useState({
    title: "",
    isImportant: false,
    isCompleted: false,
    endDate: undefined,
  } as CreateTaskDTO);

  function change(e: ChangeEvent<HTMLInputElement>): void {
    let { name, value, type, checked } = e.target as HTMLInputElement;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
    console.log(task);
  }

  function submitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    taskCreated(task);
  }

  return (
    <form onSubmit={submitHandler}>
      <FormGroup>
        <FormLabel>Title</FormLabel>
        <TextField
          title="Title"
          name="title"
          value={task.title}
          onChange={change}
        ></TextField>
      </FormGroup>
      <FormGroup>
        <FormLabel>Due Date</FormLabel>
        <TextField
          type="date"
          name="endDate"
          value={task.endDate || ""}
          onChange={change}
        ></TextField>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="isImportant"
              checked={task.isImportant}
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
              checked={task.isCompleted}
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
        Add
      </Button>
      <Button variant="outlined" color="error" onClick={close}>
        Close
      </Button>
    </form>
  );
};
