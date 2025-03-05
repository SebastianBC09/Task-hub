import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskService } from "../api/services/deleteTask";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTaskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
