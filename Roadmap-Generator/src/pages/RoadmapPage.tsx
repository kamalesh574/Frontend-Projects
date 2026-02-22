import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Circle, Clock, ExternalLink, ChevronDown, 
  ChevronUp, Share2, Download, Trash2, Trophy, BookOpen,
  ArrowLeft
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapProvider';
import confetti from 'canvas-confetti';

const RoadmapPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { roadmaps, progress, toggleNode, deleteRoadmap } = useRoadmap();
  const [expandedModule, setExpandedModule] = useState<string | null>('module-0');

  const roadmap = roadmaps.find((r) => r.id === id);
  const roadmapProgress = progress[id || ''] || { completedNodeIds: [] };

  useEffect(() => {
    if (!roadmap) {
      navigate('/library');
    }
  }, [roadmap, navigate]);

  if (!roadmap) return null;

  const totalNodes = roadmap.modules.reduce((acc, m) => acc + m.nodes.length, 0);
  const completedNodes = roadmapProgress.completedNodeIds.length;
  const progressPercentage = Math.round((completedNodes / totalNodes) * 100);

  const handleToggle = (nodeId: string) => {
    toggleNode(roadmap.id, nodeId);
    
    // Check if this was the last node to complete
    const isNowCompleted = !roadmapProgress.completedNodeIds.includes(nodeId);
    if (isNowCompleted && completedNodes + 1 === totalNodes) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#8b5cf6', '#ec4899']
      });
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmap, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${roadmap.skillName.replace(/\s+/g, '_')}_Roadmap.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this roadmap?')) {
      deleteRoadmap(roadmap.id);
      navigate('/library');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/library')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-500 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Library
          </button>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <BookOpen size={24} />
            </div>
            <h1 className="text-3xl font-bold font-display tracking-tight">{roadmap.skillName}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold border border-brand-500/20">
              {roadmap.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold border border-purple-500/20">
              {roadmap.duration} Days
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20">
              {roadmap.goal}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleExport}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background hover:bg-accent transition-colors"
            title="Export JSON"
          >
            <Download size={18} />
          </button>
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background hover:bg-accent transition-colors"
            title="Share"
          >
            <Share2 size={18} />
          </button>
          <button 
            onClick={handleDelete}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Trophy size={20} className="text-amber-500" />
            Overall Progress
          </div>
          <span className="text-sm font-bold text-brand-500">{progressPercentage}%</span>
        </div>
        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            className="h-full bg-gradient-to-r from-brand-500 to-purple-500"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {completedNodes} of {totalNodes} topics completed. Keep going!
        </p>
      </div>

      {/* Roadmap Modules */}
      <div className="space-y-6">
        {roadmap.modules.map((module, mIdx) => (
          <div key={module.id} className="relative">
            {/* Connector Line */}
            {mIdx < roadmap.modules.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border -z-10" />
            )}

            <div className="glass-card overflow-hidden">
              <button
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold text-lg ${
                    module.nodes.every(n => roadmapProgress.completedNodeIds.includes(n.id))
                      ? 'bg-emerald-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {module.week}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {module.nodes.filter(n => roadmapProgress.completedNodeIds.includes(n.id)).length} / {module.nodes.length} Topics
                    </p>
                  </div>
                </div>
                {expandedModule === module.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                  >
                    <div className="p-6 space-y-6">
                      {module.nodes.map((node) => {
                        const isCompleted = roadmapProgress.completedNodeIds.includes(node.id);
                        return (
                          <div key={node.id} className="flex gap-4 group">
                            <button
                              onClick={() => handleToggle(node.id)}
                              className={`mt-1 flex-shrink-0 transition-colors ${
                                isCompleted ? 'text-emerald-500' : 'text-muted-foreground hover:text-brand-500'
                              }`}
                            >
                              {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                            </button>
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h4 className={`font-bold transition-colors ${isCompleted ? 'text-muted-foreground line-through' : ''}`}>
                                    {node.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mt-1">{node.description}</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                  <Clock size={12} />
                                  {node.estimatedHours}h
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {node.resources.map((res, rIdx) => (
                                  <a
                                    key={rIdx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background hover:border-brand-500 hover:text-brand-500 transition-all"
                                  >
                                    <ExternalLink size={12} />
                                    {res.title}
                                    <span className="opacity-50 ml-1">({res.type})</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
