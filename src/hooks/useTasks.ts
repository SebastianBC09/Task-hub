import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasksService } from "../api/services/getTasks";
import { useTaskStore } from "../store/taskStore";

export const useTasks = () => {
  const { data: initialTasks } = useQuery({
    queryKey: ["initial-tasks"],
    queryFn: () => getTasksService.fetchAll(),
    staleTime: Infinity,
  });

  const { setInitialTasks } = useTaskStore((state) => state.actions);

  useEffect(() => {
    if (initialTasks) setInitialTasks(initialTasks);
  }, [initialTasks, setInitialTasks]);


  const { initialTasks: storeTasks, clientTasks, deletedTaskIds } = useTaskStore();

  const allTasks = useMemo(() => {
    return [
      ...storeTasks.filter(t => t.id > 0),
      ...clientTasks.filter(t => t.id < 0)
    ].filter(t => !deletedTaskIds.includes(t.id));
  }, [storeTasks, clientTasks, deletedTaskIds]);

  return {
    tasks: allTasks,
    isLoading: !initialTasks
  };
};
