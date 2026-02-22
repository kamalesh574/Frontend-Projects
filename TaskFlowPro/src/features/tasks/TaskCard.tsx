import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Priority } from '../../types';
import { Calendar, CheckSquare, Clock, MoreHorizontal } from 'lucide-react';
import { cn, getPriorityColor } from '../../utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const completedChecklist = task.checklist.filter(item => item.completed).length;
  const totalChecklist = task.checklist.length;

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-slate-100 dark:bg-slate-800 h-[120px] min-h-[120px] items-center flex justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 mb-3"
      />
    );
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      layoutId={task.id}
      className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
          getPriorityColor(task.priority)
        )}>
          {task.priority}
        </span>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">
        {task.title}
      </h4>

      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {task.labels.map(label => (
          <span
            key={label.id}
            className="w-8 h-1.5 rounded-full"
            style={{ backgroundColor: label.color }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-[10px] font-medium">
              <Calendar size={12} />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </div>
          )}
          {totalChecklist > 0 && (
            <div className="flex items-center gap-1 text-[10px] font-medium">
              <CheckSquare size={12} />
              <span>{completedChecklist}/{totalChecklist}</span>
            </div>
          )}
          {task.estimatedTime && (
            <div className="flex items-center gap-1 text-[10px] font-medium">
              <Clock size={12} />
              <span>{task.estimatedTime}m</span>
            </div>
          )}
        </div>
        
        <div className="flex -space-x-2">
           <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
             JD
           </div>
        </div>
      </div>
    </motion.div>
  );
};
