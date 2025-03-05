import React, { FC, useState } from "react";
import { Priority } from '../types/task';

interface TaskFormProps {
  onSubmit: (title: string, priority: Priority) => void;
}

export const TaskForm: FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("media");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, priority);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        className="p-2 border rounded"
      />
      <select
        className="p-2 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar Tarea</button>
    </form>
  );
};
