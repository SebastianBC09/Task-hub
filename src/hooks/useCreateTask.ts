import { useMutation } from "@tanstack/react-query";
import { createTaskService } from "../api/services/createTask";
import { TaskCreation } from "../types/task";
import { useTaskStore } from "../store/taskStore";

export const useCreateTask = () => {
  const { addClientTask } = useTaskStore((state) => state.actions);

  return useMutation({
    mutationFn: (newTask: TaskCreation) =>
      createTaskService.create(newTask),
    onSuccess: (createdTask) => {
      addClientTask(createdTask);
    },
  });
};
