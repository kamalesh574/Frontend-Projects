import React, { useState } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, Task } from '../../types';
import { TaskCard } from '../tasks/TaskCard';
import { Plus, MoreVertical, GripVertical } from 'lucide-react';
import { useTasks } from '../../hooks/useBoardData';

interface ColumnContainerProps {
  column: Column;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const ColumnContainer: React.FC<ColumnContainerProps> = ({ column, tasks, onTaskClick }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { addTask } = useTasks();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(column.id, newTaskTitle);
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-100 dark:bg-slate-900/50 opacity-40 w-[300px] min-w-[300px] h-full min-h-[500px] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-50/50 dark:bg-slate-900/30 w-[300px] min-w-[300px] h-full min-h-[500px] flex flex-col rounded-2xl border border-slate-200/50 dark:border-slate-800/50"
    >
      {/* Header */}
      <div
        {...attributes}
        {...listeners}
        className="p-4 flex items-center justify-between cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wider">
            {column.title}
          </h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-grow p-3 overflow-y-auto custom-scrollbar">
        <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </SortableContext>

        {isAdding ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-indigo-200 dark:border-indigo-900/50">
            <textarea
              autoFocus
              className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 outline-none resize-none mb-2"
              placeholder="What needs to be done?"
              rows={3}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddTask();
                }
                if (e.key === 'Escape') setIsAdding(false);
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all text-sm font-medium"
          >
            <Plus size={16} />
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};
