import { Pencil, Trash2 } from "lucide-react";
import "./TaskItem.css";
import type { Task } from "../../types/Task";

interface TaskItemProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const STATUS_LABELS = {
  "in-progress": "In Progress",
  pending: "Pending",
  completed: "Completed",
} as const;

export function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="task-item">
      <div className="task-item__avatar">
        {task.title.charAt(0).toUpperCase()}
      </div>

      <div className="task-item__content">
        <div className="task-item__header">
          <h3 className="task-item__title">{task.title}</h3>
          <div className="task-item__status">
            <div
              className={`task-item__status-dot task-item__status-dot--${task.status}`}
            />
            <span className="task-item__status-text">
              {STATUS_LABELS[task.status]}
            </span>
          </div>
        </div>

        <p className="task-item__description">{task.description}</p>
        <div className="task-item__date">{formatDate(task.updatedAt)}</div>
      </div>

      <div className="task-item__actions">
        <button
          className="task-item__action-button task-item__action-button--edit"
          onClick={() => onEdit(task.id)}
          title="Edit task"
        >
          <Pencil size={16} />
        </button>
        <button
          className="task-item__action-button task-item__action-button--delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
