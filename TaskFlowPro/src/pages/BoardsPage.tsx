import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBoards } from '../hooks/useBoardData';
import { Layout, Plus, Trash2, Calendar, ListTodo, ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const BoardsPage: React.FC = () => {
  const { boards, boardOrder, createBoard, deleteBoard, setActiveBoard } = useBoards();
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoardTitle.trim()) {
      const id = createBoard(newBoardTitle);
      setNewBoardTitle('');
      setIsCreating(false);
      navigate(`/board/${id}`);
    }
  };

  const filteredBoards = boardOrder.filter(id => 
    boards[id].title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">My Boards</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your projects and workflows</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search boards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 ring-indigo-500/20 text-sm font-medium transition-all w-full md:w-64"
              />
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={18} />
              New Board
            </button>
          </div>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBoards.map((id, i) => {
            const board = boards[id];
            const taskCount = Object.keys(board.tasks).length;
            const columnCount = board.columns.length;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
                onClick={() => {
                  setActiveBoard(id);
                  navigate(`/board/${id}`);
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layout size={28} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete this board?')) deleteBoard(id);
                    }}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white mb-2 line-clamp-1">{board.title}</h3>
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-8 line-clamp-2">
                  {board.description || 'No description provided for this board.'}
                </p>

                <div className="flex items-center gap-6 text-slate-400 dark:text-slate-500">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <ListTodo size={14} />
                    <span>{taskCount} Tasks</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Calendar size={14} />
                    <span>{format(new Date(board.createdAt), 'MMM d')}</span>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ArrowRight size={20} />
                </div>
              </motion.div>
            );
          })}

          {/* Empty State / Create Card */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsCreating(true)}
            className="group p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all min-h-[280px]"
          >
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={32} />
            </div>
            <span className="text-lg font-bold">Create New Board</span>
          </motion.button>
        </div>
      </div>

      {/* Create Board Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-10"
          >
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">New Board</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Set up a new workspace for your team.</p>
            
            <form onSubmit={handleCreateBoard} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Board Title</label>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g. Product Roadmap"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 ring-indigo-500/20 font-bold text-slate-800 dark:text-white transition-all"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-500/25 transition-all"
                >
                  Create Board
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
