import { create } from 'zustand';
import { Task, TaskUpdate } from '../types/task';

type TaskState = {
  initialTasks: Task[];
  clientTasks: Task[];
  deletedTaskIds: number[];
  actions: {
    setInitialTasks: (tasks: Task[]) => void;
    addClientTask: (task: Task) => void;
    updateTask: (id: number, updates: TaskUpdate) => void;
    deleteClientTask: (id: number) => void;
  };
};

export const useTaskStore = create<TaskState>((set) => ({
  initialTasks: [],
  clientTasks: [],
  deletedTaskIds: [],
  actions: {
    setInitialTasks: (tasks) => set({ initialTasks: tasks }),
    addClientTask: (task) =>
      set((state) => ({ clientTasks: [...state.clientTasks, task] })),
    updateTask: (id, updates) =>
      set((state) => ({
        initialTasks: state.initialTasks.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
        clientTasks: state.clientTasks.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
      })),
    deleteClientTask: (id) =>
      set((state) => ({ deletedTaskIds: [...state.deletedTaskIds, id] })),
  },
}));
