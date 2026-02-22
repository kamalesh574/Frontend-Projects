import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  History, PlusCircle, Search, Trash2, 
  ChevronRight, Clock, GraduationCap, BookOpen,
  Download, FileJson
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapProvider';

const LibraryPage: React.FC = () => {
  const { roadmaps, progress, deleteRoadmap } = useRoadmap();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredRoadmaps = roadmaps.filter((r) => 
    r.skillName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (roadmap: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmap, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${roadmap.skillName.replace(/\s+/g, '_')}_Roadmap.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this roadmap?')) {
      deleteRoadmap(id);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
            <History size={24} />
          </div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Your Roadmap Library</h1>
        </div>
        <Link
          to="/generate"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-bold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all"
        >
          <PlusCircle size={20} />
          New Roadmap
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search your roadmaps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-border bg-background pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
      </div>

      {filteredRoadmaps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-6">
            <BookOpen size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">No roadmaps found</h2>
          <p className="text-muted-foreground max-w-sm mb-8">
            {searchTerm 
              ? `We couldn't find any roadmaps matching "${searchTerm}".`
              : "You haven't generated any roadmaps yet. Start your journey today!"}
          </p>
          {!searchTerm && (
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 font-bold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all"
            >
              Generate Your First Roadmap
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap, index) => {
            const roadmapProgress = progress[roadmap.id] || { completedNodeIds: [] };
            const totalNodes = roadmap.modules.reduce((acc, m) => acc + m.nodes.length, 0);
            const completedNodes = roadmapProgress.completedNodeIds.length;
            const progressPercentage = Math.round((completedNodes / totalNodes) * 100);

            return (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                className="group glass-card p-6 cursor-pointer hover:border-brand-500/50 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => handleExport(roadmap, e)}
                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-brand-500 transition-colors"
                      title="Export JSON"
                    >
                      <FileJson size={18} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(roadmap.id, e)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-500 transition-colors">
                  {roadmap.skillName}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {roadmap.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {roadmap.duration}d
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-brand-500">{progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-500 transition-all duration-500" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Last active: {new Date(roadmapProgress.lastAccessed).toLocaleDateString()}
                  </span>
                  <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
