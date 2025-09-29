import { useState, useCallback, useMemo } from "react";
import type { Task, TaskFormData, TaskStatus } from "../types/Task";
import { useLocalStorage } from "./useLocalStorage";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useLocalStorage(
    "expandedSections",
    {
      "in-progress": true,
      pending: false,
      completed: false,
    }
  );

  const addTask = useCallback(
    (taskData: TaskFormData): Task => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<TaskFormData>) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const getTask = useCallback(
    (id: string): Task | undefined => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const getTasksByStatus = useCallback(
    (status: TaskStatus): Task[] => {
      return tasks.filter((task) => task.status === status);
    },
    [tasks]
  );

  const getFilteredTasks = useMemo((): Task[] => {
    if (!searchQuery.trim()) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const getGroupedTasks = useMemo(() => {
    return {
      "in-progress": getFilteredTasks.filter(
        (task) => task.status === "in-progress"
      ),
      pending: getFilteredTasks.filter((task) => task.status === "pending"),
      completed: getFilteredTasks.filter((task) => task.status === "completed"),
    };
  }, [getFilteredTasks]);

  const toggleSection = useCallback(
    (section: TaskStatus) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    [setExpandedSections]
  );

  const getTaskCounts = useMemo(() => {
    return {
      "in-progress": getFilteredTasks.filter((t) => t.status === "in-progress")
        .length,
      pending: getFilteredTasks.filter((t) => t.status === "pending").length,
      completed: getFilteredTasks.filter((t) => t.status === "completed")
        .length,
    };
  }, [getFilteredTasks]);

  return {
    tasks,
    searchQuery,
    expandedSections,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    getTasksByStatus,
    setSearchQuery,
    getFilteredTasks,
    getGroupedTasks,
    toggleSection,
    getTaskCounts,
    totalTasks: tasks.length,
  };
}
