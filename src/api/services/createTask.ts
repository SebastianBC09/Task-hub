import { apiClient } from "../client";
import { Task, TaskCreation, TaskCreator } from "../../types/task";

export class CreateTaskService implements TaskCreator {
  async create(task: TaskCreation): Promise<Task> {
    const response = await apiClient.post("/todos", {
      title: task.title,
      completed: task.completed || false,
      userId: 1,
      body: JSON.stringify({ priority: task.priority }),
    });

    return {
      ...response.data,
      priority: task.priority,
      id: response.data.id,
    };
  }
}

export const createTaskService = new CreateTaskService();
