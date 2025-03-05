import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskService } from "../api/services/createTask";
import { TaskCreation } from "../types/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: TaskCreation) =>
      createTaskService.create(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
