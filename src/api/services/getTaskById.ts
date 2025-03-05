import { apiClient } from "../client";

export const getTaskById = async (id: number) => {
  const response = await apiClient.get(`/todos/${id}`);
  return response.data;
};
