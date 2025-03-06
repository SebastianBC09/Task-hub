import { FC, useState, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { Priority } from "../types/task";
import { useTasks } from "../hooks/useTasks";
import { useDeleteTask } from "../hooks/useDeleteTask";

export const TaskList: FC = () => {
  const { tasks, setFilter } = useTasks();
  const { mutate: deleteTask } = useDeleteTask();
  const [filter, setLocalFilter] = useState<Priority | "todas">("todas");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setFilter(filter);
  }, [filter, setFilter]);

  const handleFilterChange = (newFilter: Priority | "todas") => {
    setIsFiltering(true);
    setTimeout(() => {
      setLocalFilter(newFilter);
      setIsFiltering(false);
    }, 200);
  };

  const filterOptions = [
    { value: "todas", label: "Todas las tareas" },
    { value: "alta", label: "Prioridad Alta" },
    { value: "media", label: "Prioridad Media" },
    { value: "baja", label: "Prioridad Baja" },
    { value: "completadas", label: "Tareas Completadas" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 p-3 -mx-3 rounded-xl">
        <div className="flex items-center gap-2 overflow-auto pb-1 scrollbar-hide">
          {filterOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleFilterChange(option.value as Priority | "todas")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === option.value
                  ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white font-bold shadow-md border border-blue-600 dark:border-blue-700"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {tasks.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">No hay tareas con esta prioridad</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Prueba con otro filtro o agrega más tareas</p>
        </motion.div>
      ) : (
        <motion.div layout className="space-y-3" animate={{ opacity: isFiltering ? 0.5 : 1 }} transition={{ duration: 0.2 }}>
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};
