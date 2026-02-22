import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext';
import { LandingPage } from './pages/LandingPage';
import { BoardsPage } from './pages/BoardsPage';
import { BoardPage } from './pages/BoardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { useBoardContext } from './context/BoardContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { state, dispatch } = useBoardContext();
  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
      className="fixed bottom-8 right-8 z-50 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl text-slate-500 dark:text-slate-400 hover:scale-110 transition-all active:scale-95"
    >
      {state.darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default function App() {
  return (
    <BoardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/board/:id" element={<BoardPage />} />
          <Route path="/analytics/:id" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ThemeToggle />
      </Router>
    </BoardProvider>
  );
}
