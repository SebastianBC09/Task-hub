import React, { FC, useState } from "react";
import { TaskItem, Task } from "./TaskItem";
import { Priority } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

export const TaskList: FC<TaskListProps> = ({ tasks, onDelete }) => {
  const [filter, setFilter] = useState<Priority | "todas">("todas");

  const filteredTasks = filter === "todas" ? tasks : tasks.filter((t) => t.priority === filter);

  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value as Priority | "todas")} className="p-2 border rounded mb-4">
        <option value="todas">Todas</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};
