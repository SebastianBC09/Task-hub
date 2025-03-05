import { apiClient } from "../client";
import { Task, TaskFetcher } from "../../types/task";
import { ApiTask } from "../../types/api";

export class GetTasksService implements TaskFetcher {
  async fetchAll(): Promise<Task[]> {
    const response = await apiClient.get("/todos?_limit=5");
    return response.data.map((apiTask: ApiTask) => ({
      id: apiTask.id,
      title: apiTask.title,
      completed: apiTask.completed,
      priority: JSON.parse(apiTask.body || "{}").priority || "media"
    }));
  }
}

export const getTasksService = new GetTasksService();
