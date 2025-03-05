import { useQuery } from "@tanstack/react-query";
import { getTasksService } from "../api/services/getTasks";
import { Task } from "../types/task";

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => getTasksService.fetchAll(),
    staleTime: 1000 * 60 * 5,
  });
};
