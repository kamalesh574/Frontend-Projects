import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, BarChart3, Layers, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      title: 'Smart Generation',
      description: 'Intelligent roadmap generation based on your skill level and time commitment.',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Progress Tracking',
      description: 'Stay motivated with visual progress indicators and milestone celebrations.',
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Deep Analytics',
      description: 'Analyze your learning patterns and mastery across different skill modules.',
      icon: BarChart3,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Resource Curation',
      description: 'Get hand-picked resources for every topic, from videos to interactive labs.',
      icon: Layers,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        
        <div className="relative text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 border border-brand-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            New: AI-Powered Skill Mapping
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight font-display max-w-4xl mx-auto leading-tight"
          >
            Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">Learning Journey</span> with Precision
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Stop wandering. Start mastering. Generate structured, interactive roadmaps for modern career skills in seconds.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/generate"
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-brand-500/25 hover:bg-brand-600 transition-all hover:scale-105 active:scale-95"
            >
              Generate Roadmap
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/library"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border border-border bg-background hover:bg-accent transition-colors"
            >
              View Examples
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 group hover:border-brand-500/50 transition-colors"
          >
            <div className={`h-12 w-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-muted/30 rounded-3xl px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Trusted by 10,000+ Lifelong Learners</h2>
          <p className="text-muted-foreground">Join the community of professionals leveling up their careers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Kamalesh', role: 'Frontend Engineer', text: 'The roadmap for React was spot on. It saved me weeks of searching for what to learn next.' },
            { name: 'Mari', role: 'Product Designer', text: 'Clean, intuitive, and actually helpful. I love how it tracks my progress visually.' },
            { name: 'Jayant', role: 'Data Scientist', text: 'The duration-based generation is a game changer for busy professionals like me.' },
          ].map((t, i) => (
            <div key={i} className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <p className="text-sm italic text-muted-foreground">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-900 px-8 py-20 text-white text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-purple-900 opacity-50" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-bold">Ready to start your journey?</h2>
          <p className="text-brand-100 max-w-xl mx-auto text-lg">
            Generate your first roadmap today and take the first step towards mastering your next big skill.
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-brand-900 hover:bg-brand-50 transition-all hover:scale-105"
          >
            Get Started Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
