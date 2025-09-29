export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

export type TaskStatus = "pending" | "in-progress" | "completed";
