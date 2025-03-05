import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/services/createTask";
import { TaskCreation } from "../types/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: TaskCreation) => createTask({
      ...newTask,
      completed: newTask.completed || false
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
