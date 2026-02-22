/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Users, Globe, CheckCircle2, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-transparent to-transparent opacity-70" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-50 via-transparent to-transparent opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Join 500+ restaurants making an impact</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]"
          >
            Reduce Waste. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
              Feed Lives.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-gray-500 mb-12 leading-relaxed"
          >
            The bridge between surplus food and those who need it most. 
            Empowering restaurants to donate and NGOs to serve their communities efficiently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto group">
                Donate Food
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Find Food
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'Meals Donated', value: '125,000+', icon: Utensils, color: 'text-emerald-600' },
              { label: 'NGO Partners', value: '450+', icon: Users, color: 'text-indigo-600' },
              { label: 'Cities Covered', value: '25+', icon: Globe, color: 'text-amber-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4"
              >
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-black text-gray-900">{stat.value}</div>
                <div className="text-gray-500 font-semibold uppercase tracking-wider text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">How it Works</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A simple, transparent, and efficient process to ensure food reaches the right hands at the right time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'List Surplus Food',
                desc: 'Restaurants list their excess food with details like quantity, type, and expiry time.',
                step: '01',
              },
              {
                title: 'NGOs Claim',
                desc: 'Verified NGOs browse available listings and claim food that matches their needs.',
                step: '02',
              },
              {
                title: 'Quick Pickup',
                desc: 'NGOs coordinate pickup directly from the restaurant location within the expiry window.',
                step: '03',
              },
            ].map((item, i) => (
              <Card key={i} className="p-8 relative group">
                <div className="text-6xl font-black text-gray-100 absolute top-4 right-8 group-hover:text-emerald-50 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Voices of Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "FoodBridge has completely transformed how we handle surplus. It's rewarding to see our food nourishing people instead of filling bins.",
                author: "Chef Kamal",
                role: "Owner, Eat and Serve Restaurant",
                image: "https://picsum.photos/seed/chef/100/100",
              },
              {
                quote: "The real-time updates and easy communication make it possible for us to serve hundreds of additional meals every week.",
                author: "Sarah Jenkins",
                role: "Director, City Hope NGO",
                image: "https://picsum.photos/seed/ngo/100/100",
              },
            ].map((t, i) => (
              <Card key={i} className="p-8 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                <img src={t.image} alt={t.author} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-600 italic font-medium leading-relaxed">"{t.quote}"</p>
                  <div>
                    <div className="font-bold text-gray-900">{t.author}</div>
                    <div className="text-emerald-600 text-sm font-bold">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
