import React, { FC, useState } from "react";
import { Priority } from '../types/task';
import { motion } from "framer-motion";

interface TaskFormProps {
  onSubmit: (title: string, priority: Priority) => void;
}

export const TaskForm: FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("media");
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onSubmit(title, priority);
      setTitle("");
      // Pequeña animación de éxito
      const form = e.currentTarget as HTMLFormElement;
      form.classList.add("opacity-70");
      setTimeout(() => form.classList.remove("opacity-70"), 300);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-lg sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <motion.div
            animate={{
              y: focused || title ? -20 : 0,
              scale: focused || title ? 0.85 : 1,
              opacity: focused || title ? 0.7 : 1
            }}
            className="absolute text-gray-500 pointer-events-none origin-left ml-2"
          >
            Nueva tarea...
          </motion.div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-500 outline-none transition-all duration-200 bg-transparent"
          />

          <motion.select
            className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            whileTap={{ scale: 0.98 }}
          >
            <option value="alta">Prioridad: Alta</option>
            <option value="media">Prioridad: Media</option>
            <option value="baja">Prioridad: Baja</option>
          </motion.select>
        </div>

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-max"
        >
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="inline-block"
            >
              ⟳
            </motion.span>
          ) : (
            'Agregar Tarea'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};
