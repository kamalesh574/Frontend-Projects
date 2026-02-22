import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBoards } from '../hooks/useBoardData';
import { KanbanBoard } from '../features/boards/KanbanBoard';
import { TaskDetailsModal } from '../features/tasks/TaskDetailsModal';
import { Task } from '../types';
import { ChevronLeft, Share2, MoreHorizontal, BarChart3, Settings, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { boards, setActiveBoard } = useBoards();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const board = id ? boards[id] : null;

  useEffect(() => {
    if (id) setActiveBoard(id);
  }, [id, setActiveBoard]);

  if (!board) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Board not found</h2>
          <button onClick={() => navigate('/boards')} className="text-indigo-600 font-bold">Go back to boards</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Board Header */}
      <header className="px-8 py-6 flex items-center justify-between bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/boards')}
            className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white">{board.title}</h1>
              <div className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-md uppercase tracking-widest">Public</div>
            </div>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Last updated 2 hours ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-3 mr-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-9 h-9 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <button className="w-9 h-9 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Users size={14} />
            </button>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

          <button
            onClick={() => navigate(`/analytics/${id}`)}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
            title="Analytics"
          >
            <BarChart3 size={20} />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
            <Share2 size={20} />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Kanban Area */}
      <main className="flex-grow flex flex-col pt-8 overflow-hidden">
        <KanbanBoard board={board} onTaskClick={setSelectedTask} />
      </main>

      {/* Task Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};
