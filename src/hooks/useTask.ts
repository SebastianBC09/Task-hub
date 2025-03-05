import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../api/services/getTaskById";
import { Task } from "../types/task";

export const useTask = (id: number) => {
  return useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
};
