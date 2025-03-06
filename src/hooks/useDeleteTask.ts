import { useMutation } from "@tanstack/react-query";
import { deleteTaskService } from "../api/services/deleteTask";
import { useTaskStore } from "../store/taskStore";

export const useDeleteTask = () => {
  const { deleteClientTask } = useTaskStore((state) => state.actions);

  return useMutation({
    mutationFn: (id: number) => deleteTaskService.delete(id),
    onSuccess: (_, id) => {
      deleteClientTask(id);
    },
  });
};
