import { apiClient } from "../client";
import { Task, TaskCreation } from "../../types/task";

export const createTask = async (task: TaskCreation) => {
  const response = await apiClient.post("/todos", {
    title: task.title,
    completed: task.completed || false,
    userId: 1,
    body: JSON.stringify({ priority: task.priority })
  });

  return {
    ...response.data,
    priority: task.priority
  } as Task;
};
