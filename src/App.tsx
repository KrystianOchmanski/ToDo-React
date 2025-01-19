import { useEffect, useState } from "react";
import { TaskList } from "./Components/TaskList";
import { getTasks } from "./Services/TaskService";
import { Task } from "./Models/Task";
import { TaskDetails } from "./Components/TaskDetails";
import { Box, Stack } from "@mui/material";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    let tasks = await getTasks();
    setTasks(tasks);
  }

  function detailsClosed(): void {
    setSelectedTask(undefined);
  }

  return (
    <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
      <Box sx={{ flex: selectedTask ? 1 : 2, transition: "flex 0.3s ease" }}>
        <TaskList
          tasks={tasks}
          selectTask={setSelectedTask}
          taskChanged={loadTasks}
        ></TaskList>
      </Box>
      {/* TaskDetails Component */}
      <Box
        sx={{
          flex: selectedTask ? 1 : 0,
          overflow: "hidden",
          transition: "flex 0.3s ease",
        }}
      >
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            submit={loadTasks}
            close={detailsClosed}
          />
        )}
      </Box>
    </Stack>
  );
}

export default App;
