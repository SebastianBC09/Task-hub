export type Priority = "alta" | "media" | "baja";
export type TaskId = number;

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

export interface TaskFetcher {
  fetchAll(): Promise<Task[]>;
}

export interface TaskCreator {
  create(task: TaskCreation): Promise<Task>;
}

export interface TaskUpdater {
  update(id: TaskId, updates: TaskUpdate): Promise<Task>;
}

export interface TaskDeleter {
  delete(id: TaskId): Promise<void>;
}

export interface TaskFilter {
  filter(tasks: Task[]): Task[];
}
