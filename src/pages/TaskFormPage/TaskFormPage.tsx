import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "./TaskFormPage.css";
import { useTasks } from "../../hooks/useTasks";
import { Header } from "../../components/Header/Header";

interface TaskFormData {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

const statusOptions = [
  { value: "pending" as const, label: "Pending", dotColor: "#D0D0D0" },
  { value: "in-progress" as const, label: "In Progress", dotColor: "#FFB03C" },
  { value: "completed" as const, label: "Completed", dotColor: "#368A04" },
];

export function TaskFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addTask, updateTask, getTask } = useTasks();

  const isEditMode = Boolean(id && id !== "new");
  const pageTitle = isEditMode ? "Edit Task" : "Add Task";

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "pending",
  });

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const existingTask = getTask(id);
      if (existingTask) {
        setFormData({
          title: existingTask.title,
          description: existingTask.description,
          status: existingTask.status,
        });
      } else {
        navigate("/");
      }
    }
  }, [id, isEditMode, getTask, navigate]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.title.trim()) {
        alert("Please enter a task title");
        return;
      }

      setIsLoading(true);

      try {
        if (isEditMode && id) {
          updateTask(id, formData);
        } else {
          addTask(formData);
        }
        navigate("/");
      } catch (error) {
        alert("Error saving task. Please try again. " + error);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, isEditMode, id, addTask, updateTask, navigate]
  );

  const handleCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleStatusSelect = useCallback(
    (status: "pending" | "in-progress" | "completed") => {
      setFormData((prev) => ({ ...prev, status }));
      setIsStatusDropdownOpen(false);
    },
    []
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, title: e.target.value }));
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, description: e.target.value }));
    },
    []
  );

  const selectedStatus = statusOptions.find(
    (option) => option.value === formData.status
  );

  const isValid = formData.title.trim().length > 0;

  return (
    <div className="task-form-page">
      <Header showBackButton title={pageTitle} onBack={handleBack} />

      <div className="task-form-page__content">
        <form onSubmit={handleSubmit} className="task-form">
          <div className="task-form__field">
            <input
              type="text"
              className="task-form__input"
              placeholder="Enter the title"
              value={formData.title}
              onChange={handleTitleChange}
              disabled={isLoading}
            />
          </div>

          <div className="task-form__field">
            <textarea
              className="task-form__textarea"
              placeholder="Enter the description"
              value={formData.description}
              onChange={handleDescriptionChange}
              rows={4}
              disabled={isLoading}
            />
          </div>

          {isEditMode && (
            <div className="task-form__field">
              <div className="status-selector">
                <button
                  type="button"
                  className="status-selector__button"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  disabled={isLoading}
                >
                  <div
                    className="status-selector__dot"
                    style={{ backgroundColor: selectedStatus?.dotColor }}
                  />
                  <span className="status-selector__label">
                    {selectedStatus?.label}
                  </span>
                  <ChevronDown
                    className={`status-selector__chevron ${
                      isStatusDropdownOpen
                        ? "status-selector__chevron--open"
                        : ""
                    }`}
                    size={16}
                  />
                </button>

                {isStatusDropdownOpen && (
                  <div className="status-selector__dropdown">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="status-selector__option"
                        onClick={() => handleStatusSelect(option.value)}
                      >
                        <div
                          className="status-selector__dot"
                          style={{ backgroundColor: option.dotColor }}
                        />
                        <span className="status-selector__label">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="task-form__actions">
            <button
              type="button"
              className="task-form__button task-form__button--cancel"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`task-form__button task-form__button--primary ${
                isEditMode ? "task-form__button--update" : ""
              }`}
              disabled={!isValid || isLoading}
            >
              {isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update"
                : "ADD"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
