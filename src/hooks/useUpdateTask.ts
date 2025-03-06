import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskService } from "../api/services/updateTask";
import { TaskUpdate } from "../types/task";
import { useTaskStore } from "../store/taskStore";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const updateTaskInStore = useTaskStore((state) => state.actions.updateTask);

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TaskUpdate }) =>
      updateTaskService.update(id, updates),
    onSuccess: (updatedTask) => {
      updateTaskInStore(updatedTask.id, updatedTask);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
