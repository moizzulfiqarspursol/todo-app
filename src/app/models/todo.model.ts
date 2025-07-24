export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  createdAt: Date;
  completed: boolean;
}
