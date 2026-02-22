import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Trophy, Clock, Target, Zap, Flame, 
  TrendingUp, Calendar, LayoutDashboard 
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapProvider';

const DashboardPage: React.FC = () => {
  const { roadmaps, progress } = useRoadmap();

  const stats = React.useMemo(() => {
    let totalHours = 0;
    let completedHours = 0;
    let totalNodes = 0;
    let completedNodes = 0;

    roadmaps.forEach((roadmap) => {
      const roadmapProgress = progress[roadmap.id] || { completedNodeIds: [] };
      roadmap.modules.forEach((module) => {
        module.nodes.forEach((node) => {
          totalNodes++;
          totalHours += node.estimatedHours;
          if (roadmapProgress.completedNodeIds.includes(node.id)) {
            completedNodes++;
            completedHours += node.estimatedHours;
          }
        });
      });
    });

    return {
      totalHours,
      completedHours,
      totalNodes,
      completedNodes,
      completionRate: totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0,
      streak: 5, // Mock streak
    };
  }, [roadmaps, progress]);

  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.0 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 5.5 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 6.5 },
    { day: 'Sun', hours: 4.5 },
  ];

  const skillBreakdown = roadmaps.map((r, i) => ({
    name: r.skillName,
    value: (progress[r.id]?.completedNodeIds.length || 0) + 1, // +1 for visual
  })).slice(0, 5);

  const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  if (roadmaps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <LayoutDashboard size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">No Data Yet</h2>
          <p className="text-muted-foreground max-w-sm">
            Generate your first roadmap to start tracking your learning progress and analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
          <LayoutDashboard size={24} />
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight">Learning Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Completion Rate', value: `${stats.completionRate}%`, icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Total Hours', value: stats.completedHours, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Topics Mastered', value: stats.completedNodes, icon: Target, color: 'text-brand-500', bg: 'bg-brand-500/10' },
          { label: 'Current Streak', value: `${stats.streak} Days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Activity */}
        <div className="lg:col-span-2 glass-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <TrendingUp size={20} className="text-brand-500" />
              Weekly Learning Activity
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={14} />
              Last 7 Days
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#0ea5e9', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="hours" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Mastery */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-2 font-bold">
            <Zap size={20} className="text-purple-500" />
            Skill Mastery Breakdown
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {skillBreakdown.map((skill, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="font-medium text-muted-foreground">{skill.name}</span>
                </div>
                <span className="font-bold">{Math.round((skill.value / stats.totalNodes) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
