import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBoards } from '../hooks/useBoardData';
import { AnalyticsDashboard } from '../features/analytics/AnalyticsDashboard';
import { ChevronLeft, Download, Filter, Calendar } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { boards } = useBoards();
  const navigate = useNavigate();

  const board = id ? boards[id] : null;

  if (!board) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="px-8 py-6 flex items-center justify-between bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(`/board/${id}`)}
            className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white">Analytics Dashboard</h1>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Performance insights for {board.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Calendar size={16} />
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition-all">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <AnalyticsDashboard />
      </main>
    </div>
  );
};
