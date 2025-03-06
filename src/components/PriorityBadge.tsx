import { FC } from "react";
import { Priority } from "../types/task";
import { motion } from "framer-motion";

export const PriorityBadge: FC<{ priority: Priority }> = ({ priority }) => {
  const priorityStyles = {
    alta: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200 dark:shadow-red-900/20",
    media: "bg-gradient-to-r from-amber-400 to-amber-500 text-black dark:text-gray-900 shadow-amber-200 dark:shadow-amber-900/20",
    baja: "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-emerald-200 dark:shadow-emerald-900/20",
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm ${priorityStyles[priority]}`}
    >
      {priority === "alta" ? "ALTA" : priority === "media" ? "MEDIA" : "BAJA"}
    </motion.span>
  );
};
