import { apiClient } from "../client";

export const updateTask = async (id: number, updates: Partial<{ title: string; completed: boolean }>) => {
  const response = await apiClient.put(`/todos/${id}`, updates);
  return response.data;
};
