import { apiClient } from "../client";
import { Task, TaskCreation, TaskCreator } from "../../types/task";

export class CreateTaskService implements TaskCreator {
  async create(task: TaskCreation): Promise<Task> {
    const simulatedResponse = await apiClient.post("/todos", {
      title: task.title,
      completed: task.completed || false,
      userId: 1,
      body: task.priority,
    });

    const clientSideId = -(Date.now());

    return {
      id: clientSideId,
      title: simulatedResponse.data.title,
      completed: simulatedResponse.data.completed,
      priority: task.priority,
    };
  }
}

export const createTaskService = new CreateTaskService();
