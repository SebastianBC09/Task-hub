import { FC, useState } from 'react';
import { PriorityBadge } from "./PriorityBadge";
import { motion } from "framer-motion";
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Pequeño retraso para la animación antes de eliminar
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDeleting ? 0 : 1,
        y: isDeleting ? -20 : 0,
        scale: isDeleting ? 0.9 : 1
      }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-5 group"
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        <motion.h3
          className="text-lg font-medium text-gray-800 dark:text-gray-100"
          layoutId={`title-${task.id}`}
        >
          {task.title}
        </motion.h3>
        <PriorityBadge priority={task.priority} />
      </div>

      <motion.button
        onClick={handleDelete}
        disabled={isDeleting}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-white dark:bg-gray-700 text-red-500 dark:text-red-400 p-2 rounded-full overflow-hidden opacity-70 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-700 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
        </svg>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isDeleting ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center bg-red-500 dark:bg-red-600 text-white rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};
