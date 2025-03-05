import { TaskDeleter } from "../../types/task";
import { apiClient } from "../client";

export class DeleteTaskService implements TaskDeleter {
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  }
}

export const deleteTaskService = new DeleteTaskService();
