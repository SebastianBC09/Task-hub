import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskService } from "../api/services/updateTask";
import { TaskUpdate } from "../types/task";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TaskUpdate }) =>
      updateTaskService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
