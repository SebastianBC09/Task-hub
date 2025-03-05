import { apiClient } from "../client";
import { Task, TaskUpdate, TaskUpdater } from "../../types/task";

export class UpdateTaskService implements TaskUpdater {
  async update(id: number, updates: TaskUpdate): Promise<Task> {
    const response = await apiClient.put(`/todos/${id}`, {
      ...updates,
      body: updates.priority ? JSON.stringify({ priority: updates.priority }) : undefined
    });

    return {
      ...response.data,
      priority: updates.priority || JSON.parse(response.data.body || "{}").priority || "media",
    };
  }
}

export const updateTaskService = new UpdateTaskService();
