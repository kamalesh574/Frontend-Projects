import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, Target, Zap, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { DifficultyLevel, LearningStyle, LearningGoal } from '../types';
import { useRoadmap } from '../context/RoadmapProvider';
import { generateRoadmap, SKILL_SUGGESTIONS } from '../utils/roadmapGenerator';

const GeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRoadmap } = useRoadmap();
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    skill: '',
    difficulty: DifficultyLevel.BEGINNER,
    duration: 30,
    style: LearningStyle.BALANCED,
    goal: LearningGoal.JOB_READY,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.skill) return;

    setIsGenerating(true);
    
    // Simulate generation delay for "AI feel"
    await new Promise(resolve => setTimeout(resolve, 2000));

    const roadmap = generateRoadmap(
      formData.skill,
      formData.difficulty,
      formData.duration,
      formData.style,
      formData.goal
    );

    addRoadmap(roadmap);
    setIsGenerating(false);
    navigate(`/roadmap/${roadmap.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 mb-4">
          <Sparkles size={28} />
        </div>
        <h1 className="text-4xl font-bold font-display tracking-tight">Generate Your Roadmap</h1>
        <p className="text-muted-foreground text-lg">
          Tell us what you want to learn, and we'll craft a personalized path for you.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-10"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Skill Input */}
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Search size={16} className="text-brand-500" />
              What skill do you want to master?
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.skill}
                onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                placeholder="e.g. Frontend Development, Data Science..."
                className="w-full rounded-xl border border-border bg-background px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                required
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILL_SUGGESTIONS.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, skill: s })}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 hover:bg-brand-500/10 hover:text-brand-500 hover:border-brand-500/30 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Difficulty */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <GraduationCap size={16} className="text-brand-500" />
                Difficulty Level
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(DifficultyLevel).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, difficulty: level })}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                      formData.difficulty === level
                        ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                        : 'bg-background border-border hover:border-brand-500/50'
                    }`}
                  >
                    <span className="font-medium">{level}</span>
                    {formData.difficulty === level && <Zap size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Clock size={16} className="text-brand-500" />
                Duration (Days)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[30, 60, 90].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setFormData({ ...formData, duration: days })}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                      formData.duration === days
                        ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                        : 'bg-background border-border hover:border-brand-500/50'
                    }`}
                  >
                    <span className="font-medium">{days} Days</span>
                    <span className="text-xs opacity-80">{Math.round(days / 7)} Weeks</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Learning Style */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Zap size={16} className="text-brand-500" />
                Learning Style
              </label>
              <select
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value as LearningStyle })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none"
              >
                {Object.values(LearningStyle).map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Target size={16} className="text-brand-500" />
                Primary Goal
              </label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value as LearningGoal })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none"
              >
                {Object.values(LearningGoal).map((goal) => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !formData.skill}
            className="w-full group relative flex items-center justify-center gap-3 rounded-xl bg-brand-500 py-4 text-lg font-bold text-white shadow-xl shadow-brand-500/25 hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            {isGenerating ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Crafting Your Journey...
              </>
            ) : (
              <>
                Generate Roadmap
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
            {isGenerating && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default GeneratorPage;
