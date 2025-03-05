export type Priority = "alta" | "media" | "baja";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}

export interface TaskCreation {
  title: string;
  priority: Priority;
  completed?: boolean;
}

export interface TaskUpdate {
  title?: string;
  completed?: boolean;
  priority?: Priority;
}

export interface FilterStrategy {
  filter(tasks: Task[]): Task[];
}

export interface TaskFormProps {
  onSubmit: (title: string, priority: Priority) => void;
}
