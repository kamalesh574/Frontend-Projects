import { useBoardContext } from "../context/BoardContext";
import { Board, Column, Task, Priority } from "../types";

// Helper to generate unique IDs without external dependencies
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const useBoards = () => {
  const { state, dispatch } = useBoardContext();

  const createBoard = (title: string, description: string = "") => {
    const id = generateId();
    const defaultColumns: Column[] = [
      { id: generateId(), title: "To Do", taskIds: [] },
      { id: generateId(), title: "In Progress", taskIds: [] },
      { id: generateId(), title: "Review", taskIds: [] },
      { id: generateId(), title: "Done", taskIds: [] },
    ];

    const newBoard: Board = {
      id,
      title,
      description,
      columns: defaultColumns,
      tasks: {},
      columnOrder: defaultColumns.map((c) => c.id),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_BOARD", payload: newBoard });
    return id;
  };

  const deleteBoard = (id: string) => {
    dispatch({ type: "DELETE_BOARD", payload: id });
  };

  const setActiveBoard = (id: string | null) => {
    dispatch({ type: "SET_ACTIVE_BOARD", payload: id });
  };

  return {
    boards: state.boards,
    boardOrder: state.boardOrder,
    activeBoard: state.activeBoardId ? state.boards[state.activeBoardId] : null,
    createBoard,
    deleteBoard,
    setActiveBoard,
  };
};

export const useTasks = () => {
  const { state, dispatch } = useBoardContext();
  const boardId = state.activeBoardId;

  const addTask = (columnId: string, title: string) => {
    if (!boardId) return;
    const task: Task = {
      id: generateId(),
      columnId,
      title,
      description: "",
      priority: Priority.MEDIUM,
      labels: [],
      checklist: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_TASK", payload: { boardId, task } });
  };

  const updateTask = (task: Task) => {
    if (!boardId) return;
    dispatch({ type: "UPDATE_TASK", payload: { boardId, task: { ...task, updatedAt: new Date().toISOString() } } });
  };

  const deleteTask = (taskId: string, columnId: string) => {
    if (!boardId) return;
    dispatch({ type: "DELETE_TASK", payload: { boardId, taskId, columnId } });
  };

  return { addTask, updateTask, deleteTask };
};

export const useColumns = () => {
  const { state, dispatch } = useBoardContext();
  const boardId = state.activeBoardId;

  const addColumn = (title: string) => {
    if (!boardId) return;
    const column: Column = {
      id: generateId(),
      title,
      taskIds: [],
    };
    dispatch({ type: "ADD_COLUMN", payload: { boardId, column } });
  };

  const updateColumn = (columnId: string, title: string) => {
    if (!boardId) return;
    dispatch({ type: "UPDATE_COLUMN", payload: { boardId, columnId, title } });
  };

  const deleteColumn = (columnId: string) => {
    if (!boardId) return;
    dispatch({ type: "DELETE_COLUMN", payload: { boardId, columnId } });
  };

  return { addColumn, updateColumn, deleteColumn };
};
