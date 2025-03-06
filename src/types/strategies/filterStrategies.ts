import { Task, Priority } from "../../types/task";

export interface FilterStrategy {
  filter(tasks: Task[]): Task[];
}

export class AllTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks;
  }
}

export class PriorityFilterStrategy implements FilterStrategy {
  constructor(private priority: Priority) {}

  filter(tasks: Task[]): Task[] {
    return tasks.filter(t => t.priority === this.priority);
  }
}

export class CompletedFilterStrategy implements FilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter(t => t.completed);
  }
}
