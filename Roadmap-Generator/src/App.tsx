import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoadmapProvider } from './context/RoadmapProvider';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import RoadmapPage from './pages/RoadmapPage';
import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';

export default function App() {
  return (
    <RoadmapProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="generate" element={<GeneratorPage />} />
            <Route path="roadmap/:id" element={<RoadmapPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="library" element={<LibraryPage />} />
          </Route>
        </Routes>
      </Router>
    </RoadmapProvider>
  );
}
