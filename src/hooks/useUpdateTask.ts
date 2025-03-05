import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/services/updateTask";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<{ title: string; completed: boolean }> }) =>
      updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
