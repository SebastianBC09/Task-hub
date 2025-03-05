import { apiClient } from "../client";
import { Task } from "../../types/task";
import { ApiTask } from "../../types/api";

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get("/todos");

  return response.data.map((apiTask: ApiTask) => ({
    id: apiTask.id,
    title: apiTask.title,
    completed: apiTask.completed,
    priority: JSON.parse(apiTask.body || '{}').priority || "media"
  })) as Task[];
};
