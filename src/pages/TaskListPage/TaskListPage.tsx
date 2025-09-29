import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import "./TaskListPage.css";
import { useTasks } from "../../hooks/useTasks";
import { Header } from "../../components/Header/Header";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { TaskAccordion } from "../../components/TaskAccordion/TaskAccordion";

export function TaskListPage() {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    expandedSections,
    toggleSection,
    getGroupedTasks,
    getTaskCounts,
    deleteTask,
  } = useTasks();

  const groupedTasks = getGroupedTasks;
  const taskCounts = getTaskCounts;

  const handleEditTask = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const handleAddTask = () => {
    navigate("/task/new");
  };

  return (
    <div className="task-list-page">
      <Header title="TODO APP" />

      <div className="task-list-page__content">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="task-list-page__accordions">
          <TaskAccordion
            title="In Progress"
            count={taskCounts["in-progress"]}
            tasks={groupedTasks["in-progress"]}
            isExpanded={expandedSections["in-progress"]}
            onToggle={() => toggleSection("in-progress")}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <TaskAccordion
            title="Pending"
            count={taskCounts.pending}
            tasks={groupedTasks.pending}
            isExpanded={expandedSections.pending}
            onToggle={() => toggleSection("pending")}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <TaskAccordion
            title="Completed"
            count={taskCounts.completed}
            tasks={groupedTasks.completed}
            isExpanded={expandedSections.completed}
            onToggle={() => toggleSection("completed")}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      <button
        className="task-list-page__floating-button"
        onClick={handleAddTask}
        title="Add new task"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
