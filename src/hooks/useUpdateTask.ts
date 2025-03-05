import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/services/updateTask";
import { TaskUpdate } from "../types/task";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TaskUpdate }) =>
      updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
