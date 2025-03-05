import { FC, useEffect, useState } from "react";
import { TaskItem } from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { Task, Priority } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  error?: string;
}

export const TaskList: FC<TaskListProps> = ({ tasks, onDelete, error }) => {
  const [filter, setFilter] = useState<Priority | "todas">("todas");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (error) {
      // Mostramos un mensaje de error más elegante que un alert
      console.error(error);
    }
  }, [error]);

  const filteredTasks = filter === "todas" ? tasks : tasks.filter((t) => t.priority === filter);

  const handleFilterChange = (newFilter: Priority | "todas") => {
    setIsFiltering(true);
    setTimeout(() => {
      setFilter(newFilter);
      setIsFiltering(false);
    }, 200);
  };

  const filterOptions = [
    { value: "todas", label: "Todas las tareas" },
    { value: "alta", label: "Prioridad Alta" },
    { value: "media", label: "Prioridad Media" },
    { value: "baja", label: "Prioridad Baja" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="sticky top-0 z-10 bg-gray-50 p-3 -mx-3 rounded-xl">
        <div className="flex items-center gap-2 overflow-auto pb-1 scrollbar-hide">
          {filterOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleFilterChange(option.value as Priority | "todas")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === option.value
                  ? "bg-blue-500 text-gray-900 dark:text-white font-bold shadow-md border border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center"
        >
          <p className="text-gray-500 mb-2">Aún no hay tareas</p>
          <p className="text-gray-400 text-sm">Agrega tu primera tarea usando el formulario</p>
        </motion.div>
      ) : filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center"
        >
          <p className="text-gray-500 mb-2">No hay tareas con esta prioridad</p>
          <p className="text-gray-400 text-sm">Prueba con otro filtro o agrega más tareas</p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="space-y-3"
          animate={{ opacity: isFiltering ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={onDelete} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};
