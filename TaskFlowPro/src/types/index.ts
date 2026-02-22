import { Type } from "@google/genai";

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Label {
  id: string;
  text: string;
  color: string;
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
  labels: Label[];
  checklist: ChecklistItem[];
  estimatedTime?: number; // in minutes
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
  tasks: Record<string, Task>;
  columnOrder: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  boards: Record<string, Board>;
  boardOrder: string[];
  activeBoardId: string | null;
  darkMode: boolean;
}

export type BoardAction =
  | { type: "ADD_BOARD"; payload: Board }
  | { type: "UPDATE_BOARD"; payload: Board }
  | { type: "DELETE_BOARD"; payload: string }
  | { type: "SET_ACTIVE_BOARD"; payload: string | null }
  | { type: "MOVE_TASK"; payload: { taskId: string; sourceColId: string; destColId: string; index: number } }
  | { type: "REORDER_COLUMN"; payload: { sourceIndex: number; destIndex: number } }
  | { type: "ADD_TASK"; payload: { boardId: string; task: Task } }
  | { type: "UPDATE_TASK"; payload: { boardId: string; task: Task } }
  | { type: "DELETE_TASK"; payload: { boardId: string; taskId: string; columnId: string } }
  | { type: "ADD_COLUMN"; payload: { boardId: string; column: Column } }
  | { type: "UPDATE_COLUMN"; payload: { boardId: string; columnId: string; title: string } }
  | { type: "DELETE_COLUMN"; payload: { boardId: string; columnId: string } }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "LOAD_STATE"; payload: AppState };
