import React from "react";
import { Priority } from "../types/task";


const priorityColors: Record<Priority, string> = {
  alta: "bg-red-500 text-white",
  media: "bg-yellow-500 text-black",
  baja: "bg-green-500 text-white",
};

export const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColors[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};
