import React, { FC } from 'react'
import { PriorityBadge } from "./PriorityBadge";
import { motion } from "framer-motion";
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex justify-between items-center bg-white shadow-md rounded-lg p-4"
    >
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>
      <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-3 py-1 rounded">
        Eliminar
      </button>
    </motion.div>
  );
};

export { Task };
