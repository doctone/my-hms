import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Task } from "./types";

interface TaskFormProps {
  onSubmit: (task: Task) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.title || !task.description || !task.dueDate || !task.status) {
      toast({
        title: "Error",
        description: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit(task);

    toast({
      title: "Task Created",
      description: "Your task has been successfully created.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTask({
      title: "",
      description: "",
      dueDate: "",
      status: "pending",
    });
  };

  return (
    <Box
      w="100%"
      maxW="600px"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Task Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Task Description</FormLabel>
            <Textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </FormControl>

          <FormControl id="dueDate" isRequired>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="status" isRequired>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={task.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Create Task
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TaskForm;
