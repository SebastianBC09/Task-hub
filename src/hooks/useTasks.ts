import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasksService } from "../api/services/getTasks";
import { useTaskStore } from "../store/taskStore";
import { Task } from "../types/task";
import {
  FilterStrategy,
  AllTasksStrategy,
  PriorityFilterStrategy,
  CompletedFilterStrategy,
} from "../types/strategies/filterStrategies";

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
      ...storeTasks.filter((t) => t.id > 0),
      ...clientTasks.filter((t) => t.id < 0),
    ].filter((t) => !deletedTaskIds.includes(t.id));
  }, [storeTasks, clientTasks, deletedTaskIds]);

  const [filter, setFilter] = useState<"todas" | "completadas" | Task["priority"]>("todas");

  const filterStrategy: FilterStrategy = useMemo(() => {
    switch (filter) {
      case "alta":
      case "media":
      case "baja":
        return new PriorityFilterStrategy(filter);
      case "completadas":
        return new CompletedFilterStrategy();
      default:
        return new AllTasksStrategy();
    }
  }, [filter]);

  const filteredTasks = useMemo(() => filterStrategy.filter(allTasks), [allTasks, filterStrategy]);

  return {
    tasks: filteredTasks,
    isLoading: !initialTasks,
    setFilter,
  };
};
