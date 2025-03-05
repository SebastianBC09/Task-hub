import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/services/createTask";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
