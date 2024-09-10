import "./App.css";
import TaskForm from "./Form";
import { Box, Heading } from "@chakra-ui/react";

import { Task } from "./types";

function App() {
  const submit = async (task: Task) => {
    const response = await fetch(import.meta.env.VITE_API_URL + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Heading variant="h1">Task Manager</Heading>
      <Box
        sx={{ height: "100vh" }}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
      >
        <TaskForm onSubmit={submit} />
      </Box>
    </Box>
  );
}

export default App;
