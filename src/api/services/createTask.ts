import { apiClient } from "../client";

export const createTask = async (task: { title: string; completed: boolean }) => {
  const response = await apiClient.post("/todos", task);
  return response.data;
};
