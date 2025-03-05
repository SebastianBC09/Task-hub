import { apiClient } from "../client";

export const deleteTask = async (id: number) => {
  const response = await apiClient.delete(`/todos/${id}`);
  return response.data;
};
