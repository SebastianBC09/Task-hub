import { apiClient } from "../client";
import { Task } from "../../types/task";

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await apiClient.get(`/todos/${id}`);

  return {
    id: response.data.id,
    title: response.data.title,
    completed: response.data.completed,
    priority: JSON.parse(response.data.body || '{}').priority || "media"
  } as Task;
};
