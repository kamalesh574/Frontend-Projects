import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { AppState, BoardAction, Board, Column, Task, Priority } from "../types";

const initialState: AppState = {
  boards: {},
  boardOrder: [],
  activeBoardId: null,
  darkMode: false,
};

const boardReducer = (state: AppState, action: BoardAction): AppState => {
  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;

    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    case "ADD_BOARD":
      return {
        ...state,
        boards: { ...state.boards, [action.payload.id]: action.payload },
        boardOrder: [...state.boardOrder, action.payload.id],
        activeBoardId: action.payload.id,
      };

    case "UPDATE_BOARD":
      return {
        ...state,
        boards: { ...state.boards, [action.payload.id]: action.payload },
      };

    case "DELETE_BOARD": {
      const { [action.payload]: _, ...remainingBoards } = state.boards;
      return {
        ...state,
        boards: remainingBoards,
        boardOrder: state.boardOrder.filter((id) => id !== action.payload),
        activeBoardId:
          state.activeBoardId === action.payload ? null : state.activeBoardId,
      };
    }

    case "SET_ACTIVE_BOARD":
      return { ...state, activeBoardId: action.payload };

    case "MOVE_TASK": {
      if (!state.activeBoardId) return state;
      const board = state.boards[state.activeBoardId];
      const { taskId, sourceColId, destColId, index } = action.payload;

      const sourceCol = board.columns.find((c) => c.id === sourceColId);
      const destCol = board.columns.find((c) => c.id === destColId);
      if (!sourceCol || !destCol) return state;

      const newTaskIdsSource = Array.from(sourceCol.taskIds);
      const taskIndex = newTaskIdsSource.indexOf(taskId);
      if (taskIndex > -1) newTaskIdsSource.splice(taskIndex, 1);

      const newTaskIdsDest =
        sourceColId === destColId
          ? newTaskIdsSource
          : Array.from(destCol.taskIds);
      newTaskIdsDest.splice(index, 0, taskId);

      const updatedColumns = board.columns.map((col) => {
        if (col.id === sourceColId)
          return { ...col, taskIds: newTaskIdsSource };
        if (col.id === destColId) return { ...col, taskIds: newTaskIdsDest };
        return col;
      });

      const updatedTask = {
        ...board.tasks[taskId],
        columnId: destColId,
        updatedAt: new Date().toISOString(),
      };

      return {
        ...state,
        boards: {
          ...state.boards,
          [state.activeBoardId]: {
            ...board,
            columns: updatedColumns,
            tasks: { ...board.tasks, [taskId]: updatedTask },
          },
        },
      };
    }

    case "REORDER_COLUMN": {
      if (!state.activeBoardId) return state;
      const board = state.boards[state.activeBoardId];
      const { sourceIndex, destIndex } = action.payload;
      const newColumnOrder = Array.from(board.columnOrder);
      const [removed] = newColumnOrder.splice(sourceIndex, 1);
      newColumnOrder.splice(destIndex, 0, removed);

      return {
        ...state,
        boards: {
          ...state.boards,
          [state.activeBoardId]: { ...board, columnOrder: newColumnOrder },
        },
      };
    }

    case "ADD_TASK": {
      const { boardId, task } = action.payload;
      const board = state.boards[boardId];
      const column = board.columns.find((c) => c.id === task.columnId);
      if (!column) return state;

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: {
            ...board,
            tasks: { ...board.tasks, [task.id]: task },
            columns: board.columns.map((c) =>
              c.id === task.columnId
                ? { ...c, taskIds: [...c.taskIds, task.id] }
                : c,
            ),
          },
        },
      };
    }

    case "UPDATE_TASK": {
      const { boardId, task } = action.payload;
      const board = state.boards[boardId];
      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: {
            ...board,
            tasks: { ...board.tasks, [task.id]: task },
          },
        },
      };
    }

    case "DELETE_TASK": {
      const { boardId, taskId, columnId } = action.payload;
      const board = state.boards[boardId];
      const { [taskId]: _, ...remainingTasks } = board.tasks;

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: {
            ...board,
            tasks: remainingTasks,
            columns: board.columns.map((c) =>
              c.id === columnId
                ? { ...c, taskIds: c.taskIds.filter((id) => id !== taskId) }
                : c,
            ),
          },
        },
      };
    }

    case "ADD_COLUMN": {
      const { boardId, column } = action.payload;
      const board = state.boards[boardId];
      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: {
            ...board,
            columns: [...board.columns, column],
            columnOrder: [...board.columnOrder, column.id],
          },
        },
      };
    }

    case "UPDATE_COLUMN": {
      const { boardId, columnId, title } = action.payload;
      const board = state.boards[boardId];
      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: {
            ...board,
            columns: board.columns.map((c) =>
              c.id === columnId ? { ...c, title } : c,
            ),
          },
        },
      };
    }

    case "DELETE_COLUMN": {
      const { boardId, columnId } = action.payload;
      const board = state.boards[boardId];
      const column = board.columns.find((c) => c.id === columnId);
      if (!column) return state;

      const remainingTasks = { ...board.tasks };
      column.taskIds.forEach((id) => delete remainingTasks[id]);

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: {
            ...board,
            tasks: remainingTasks,
            columns: board.columns.filter((c) => c.id !== columnId),
            columnOrder: board.columnOrder.filter((id) => id !== columnId),
          },
        },
      };
    }

    default:
      return state;
  }
};

const BoardContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<BoardAction>;
} | null>(null);

export const BoardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("kanban_app_state");
    if (savedState) {
      try {
        dispatch({ type: "LOAD_STATE", payload: JSON.parse(savedState) });
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("kanban_app_state", JSON.stringify(state));
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context)
    throw new Error("useBoardContext must be used within a BoardProvider");
  return context;
};
