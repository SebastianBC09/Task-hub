import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from '../hooks/useTasks';
import { useCreateTask } from '../hooks/useCreateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';

const TaskHub: FC = () => {
  const { data: tasks = [], isLoading, isError, error } = useTasks();
  const { mutate: createTask } = useCreateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <AnimatePresence>
        {showHero && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white w-full"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  repeat: 1,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="text-5xl mb-4"
              >
                ✓
              </motion.div>
              <motion.h1
                className="text-3xl font-bold text-blue-600"
                animate={{
                  opacity: [0, 1],
                  y: [20, 0]
                }}
                transition={{ delay: 0.3 }}
              >
                TaskHub
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full px-0 py-8 md:py-12">
        <div className="w-full">
          <header className="mb-8 w-full px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full"
            >
              <motion.h1
                className="text-3xl font-bold text-gray-900 mb-2 flex items-center"
                layoutId="app-title"
              >
                <motion.span
                  className="text-blue-500 mr-2"
                  animate={{ rotate: [0, 15, 0, 15, 0] }}
                  transition={{ duration: 1, delay: 2, repeat: 0 }}
                >
                  ✓
                </motion.span>
                TaskHub
              </motion.h1>
              <p className="text-gray-600">Gestiona tus tareas de forma eficiente</p>
            </motion.div>
          </header>

          {isLoading ? (
              <motion.div
                className="flex justify-center py-20 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
              </motion.div>
            ) : isError ? (
              <motion.div
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded mx-4 sm:mx-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex w-full">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      Error al cargar las tareas. Por favor, intenta refrescar la página.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-0 w-full">
                <div className="lg:col-span-4 w-full px-4 sm:px-6">
                  <TaskForm
                    onSubmit={(title, priority) =>
                      createTask({ title, priority, completed: false })
                    }
                  />
                </div>
                <div className="lg:col-span-8 w-full px-4 sm:px-6">
                  <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                    error={error as string}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TaskHub;
