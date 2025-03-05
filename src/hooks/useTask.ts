import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../api/services/getTaskById";

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
};
