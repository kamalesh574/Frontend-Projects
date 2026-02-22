import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
  DropAnimation,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { ColumnContainer } from '../lists/ColumnContainer';
import { TaskCard } from '../tasks/TaskCard';
import { Board, Column, Task } from '../../types';
import { useBoardContext } from '../../context/BoardContext';
import { createPortal } from 'react-dom';
import { Plus } from 'lucide-react';
import { useColumns } from '../../hooks/useBoardData';

interface KanbanBoardProps {
  board: Board;
  onTaskClick: (task: Task) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ board, onTaskClick }) => {
  const { dispatch } = useBoardContext();
  const { addColumn } = useColumns();
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const activeTask = active.data.current?.task;
      const overTask = over.data.current?.task;

      if (activeTask.columnId !== overTask.columnId) {
        const overCol = board.columns.find(c => c.id === overTask.columnId);
        const overIndex = overCol?.taskIds.indexOf(overId as string) ?? 0;
        
        dispatch({
          type: 'MOVE_TASK',
          payload: {
            taskId: activeId as string,
            sourceColId: activeTask.columnId,
            destColId: overTask.columnId,
            index: overIndex,
          },
        });
      }
    }

    // Dropping a Task over a Column
    const isOverAColumn = over.data.current?.type === 'Column';
    if (isActiveATask && isOverAColumn) {
      const activeTask = active.data.current?.task;
      if (activeTask.columnId !== overId) {
        dispatch({
          type: 'MOVE_TASK',
          payload: {
            taskId: activeId as string,
            sourceColId: activeTask.columnId,
            destColId: overId as string,
            index: 0,
          },
        });
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (isActiveAColumn) {
      const activeIndex = board.columnOrder.indexOf(activeId as string);
      const overIndex = board.columnOrder.indexOf(overId as string);
      dispatch({ type: 'REORDER_COLUMN', payload: { sourceIndex: activeIndex, destIndex: overIndex } });
    } else {
      // Task reordering within same column
      const activeTask = active.data.current?.task;
      const overTask = over.data.current?.task;
      
      if (activeTask && overTask && activeTask.columnId === overTask.columnId) {
        const col = board.columns.find(c => c.id === activeTask.columnId);
        if (col) {
          const activeIndex = col.taskIds.indexOf(activeId as string);
          const overIndex = col.taskIds.indexOf(overId as string);
          dispatch({
            type: 'MOVE_TASK',
            payload: {
              taskId: activeId as string,
              sourceColId: activeTask.columnId,
              destColId: activeTask.columnId,
              index: overIndex,
            },
          });
        }
      }
    }
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
    <div className="flex-grow overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-6 px-8 h-full min-w-max">
          <SortableContext items={board.columnOrder} strategy={horizontalListSortingStrategy}>
            {board.columnOrder.map((colId) => {
              const column = board.columns.find((c) => c.id === colId);
              if (!column) return null;
              const tasks = column.taskIds.map((id) => board.tasks[id]).filter(Boolean);
              return <ColumnContainer key={colId} column={column} tasks={tasks} onTaskClick={onTaskClick} />;
            })}
          </SortableContext>

          <button
            onClick={() => addColumn('New Column')}
            className="h-[500px] w-[300px] min-w-[300px] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all"
          >
            <Plus size={24} />
            <span className="font-semibold">Add Column</span>
          </button>
        </div>

        {createPortal(
          <DragOverlay dropAnimation={dropAnimation}>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={activeColumn.taskIds.map((id) => board.tasks[id]).filter(Boolean)}
                onTaskClick={onTaskClick}
              />
            )}
            {activeTask && <TaskCard task={activeTask} onClick={() => {}} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
