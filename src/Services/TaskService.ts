import { CreateTaskDTO } from "../Models/CreateTaskDTO";
import { Task } from "../Models/Task";
import { API_URL } from "../utils";

const taskApiUrl = `${API_URL}/Task`;

export const getTasks = async (): Promise<Task[]> => {
  let taskList: Task[] = [];
  await fetch(taskApiUrl)
    .then((res) => res.json())
    .then((data) => (taskList = data));
  return taskList;
};

export const addTask = async (task: CreateTaskDTO) => {
  await fetch(taskApiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(task),
  });
};
