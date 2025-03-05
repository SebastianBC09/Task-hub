import { apiClient } from "../client";
import { Task, TaskUpdate } from "../../types/task";

export const updateTask = async (id: number, updates: TaskUpdate) => {
  const response = await apiClient.put(`/todos/${id}`, {
    ...updates,
    body: updates.priority ? JSON.stringify({ priority: updates.priority }) : undefined
  });

  return {
    ...response.data,
    priority: updates.priority || JSON.parse(response.data.body || '{}').priority
  } as Task;
};
