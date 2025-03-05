import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/services/getTasks";
import { Task } from "../types/task";

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 5,
  });
};
