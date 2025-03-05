import { apiClient } from "../client";

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};
