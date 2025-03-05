import { apiClient } from "../client";

export const getTasks = async () => {
  const response = await apiClient.get("/todos");
  return response.data;
};
