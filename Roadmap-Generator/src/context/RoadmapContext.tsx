import { Roadmap, Progress } from '../types';

type RoadmapState = {
  roadmaps: Roadmap[];
  activeRoadmapId: string | null;
  progress: Record<string, Progress>;
};

type RoadmapAction =
  | { type: 'ADD_ROADMAP'; payload: Roadmap }
  | { type: 'DELETE_ROADMAP'; payload: string }
  | { type: 'SET_ACTIVE_ROADMAP'; payload: string }
  | { type: 'TOGGLE_NODE'; payload: { roadmapId: string; nodeId: string } }
  | { type: 'LOAD_STORAGE'; payload: Partial<RoadmapState> };

export const roadmapReducer = (state: RoadmapState, action: RoadmapAction): RoadmapState => {
  switch (action.type) {
    case 'ADD_ROADMAP':
      return {
        ...state,
        roadmaps: [action.payload, ...state.roadmaps],
        activeRoadmapId: action.payload.id,
        progress: {
          ...state.progress,
          [action.payload.id]: {
            roadmapId: action.payload.id,
            completedNodeIds: [],
            lastAccessed: new Date().toISOString(),
          },
        },
      };
    case 'DELETE_ROADMAP':
      const { [action.payload]: _, ...remainingProgress } = state.progress;
      return {
        ...state,
        roadmaps: state.roadmaps.filter((r) => r.id !== action.payload),
        activeRoadmapId: state.activeRoadmapId === action.payload ? null : state.activeRoadmapId,
        progress: remainingProgress,
      };
    case 'SET_ACTIVE_ROADMAP':
      return { ...state, activeRoadmapId: action.payload };
    case 'TOGGLE_NODE': {
      const { roadmapId, nodeId } = action.payload;
      const currentProgress = state.progress[roadmapId] || {
        roadmapId,
        completedNodeIds: [],
        lastAccessed: new Date().toISOString(),
      };

      const isCompleted = currentProgress.completedNodeIds.includes(nodeId);
      const newCompletedNodeIds = isCompleted
        ? currentProgress.completedNodeIds.filter((id) => id !== nodeId)
        : [...currentProgress.completedNodeIds, nodeId];

      return {
        ...state,
        progress: {
          ...state.progress,
          [roadmapId]: {
            ...currentProgress,
            completedNodeIds: newCompletedNodeIds,
            lastAccessed: new Date().toISOString(),
          },
        },
      };
    }
    case 'LOAD_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
