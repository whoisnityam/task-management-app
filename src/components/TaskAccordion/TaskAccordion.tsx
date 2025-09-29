import { ChevronDown } from "lucide-react";
import "./TaskAccordion.css";
import type { Task } from "../../types/Task";
import { TaskItem } from "../TaskItem/TaskItem";

interface TaskAccordionProps {
  title: string;
  count: number;
  tasks: Task[];
  isExpanded: boolean;
  onToggle: () => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskAccordion({
  title,
  count,
  tasks,
  isExpanded,
  onToggle,
  onEditTask,
  onDeleteTask,
}: TaskAccordionProps) {
  return (
    <div className="task-accordion">
      <div
        className={`task-accordion__header ${
          isExpanded ? "task-accordion__header--expanded" : ""
        }`}
        onClick={onToggle}
      >
        <span className="task-accordion__title">
          {title} <span className="task-accordion__count">({count})</span>
        </span>
        <ChevronDown
          className={`task-accordion__chevron ${
            isExpanded ? "task-accordion__chevron--expanded" : ""
          }`}
          size={16}
        />
      </div>

      {isExpanded && (
        <div className="task-accordion__content">
          {tasks.length === 0 ? (
            <div className="task-accordion__empty">
              No {title.toLowerCase()} tasks
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
