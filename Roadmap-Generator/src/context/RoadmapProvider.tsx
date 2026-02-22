import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { roadmapReducer } from './RoadmapContext';
import { Roadmap, Progress } from '../types';

interface RoadmapContextType {
  roadmaps: Roadmap[];
  activeRoadmapId: string | null;
  progress: Record<string, Progress>;
  addRoadmap: (roadmap: Roadmap) => void;
  deleteRoadmap: (id: string) => void;
  setActiveRoadmap: (id: string) => void;
  toggleNode: (roadmapId: string, nodeId: string) => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

const STORAGE_KEY = 'learning_roadmap_app_state';

export const RoadmapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(roadmapReducer, {
    roadmaps: [],
    activeRoadmapId: null,
    progress: {},
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STORAGE', payload: parsed });
      } catch (e) {
        console.error('Failed to parse storage', e);
      }
    }
    // Always ensure dark mode is active
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      roadmaps: state.roadmaps,
      activeRoadmapId: state.activeRoadmapId,
      progress: state.progress,
    }));
  }, [state.roadmaps, state.activeRoadmapId, state.progress]);

  const addRoadmap = (roadmap: Roadmap) => dispatch({ type: 'ADD_ROADMAP', payload: roadmap });
  const deleteRoadmap = (id: string) => dispatch({ type: 'DELETE_ROADMAP', payload: id });
  const setActiveRoadmap = (id: string) => dispatch({ type: 'SET_ACTIVE_ROADMAP', payload: id });
  const toggleNode = (roadmapId: string, nodeId: string) => dispatch({ type: 'TOGGLE_NODE', payload: { roadmapId, nodeId } });

  return (
    <RoadmapContext.Provider value={{
      ...state,
      addRoadmap,
      deleteRoadmap,
      setActiveRoadmap,
      toggleNode,
    }}>
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) throw new Error('useRoadmap must be used within a RoadmapProvider');
  return context;
};
