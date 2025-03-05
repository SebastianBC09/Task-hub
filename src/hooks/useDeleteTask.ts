import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/services/deleteTask";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
