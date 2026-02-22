/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Utensils, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { UserRole } from '../types';

const AuthPage: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role && name) {
      login(role, name);
      navigate(role === 'RESTAURANT' ? '/restaurant' : '/ngo');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Join the <span className="text-emerald-600">Movement.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Whether you're a restaurant with surplus or an NGO serving the community, 
              we're here to bridge the gap.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { icon: ShieldCheck, text: 'Verified and secure platform' },
              { icon: Utensils, text: 'Real-time food availability' },
              { icon: Users, text: 'Direct communication channels' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="flex items-center space-x-4 text-gray-700 font-semibold"
              >
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                  <item.icon className="w-5 h-5" />
                </div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 lg:p-10">
            {!role ? (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Choose your role</h2>
                  <p className="text-gray-500">How would you like to use FoodBridge?</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setRole('RESTAURANT')}
                    className="group p-6 border-2 border-gray-100 rounded-2xl text-left hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Utensils className="w-6 h-6" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">I am a Restaurant</h3>
                    <p className="text-gray-500 text-sm">I want to donate surplus food and reduce waste.</p>
                  </button>
                  <button
                    onClick={() => setRole('NGO')}
                    className="group p-6 border-2 border-gray-100 rounded-2xl text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Users className="w-6 h-6" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">I am an NGO</h3>
                    <p className="text-gray-500 text-sm">I want to find food for my community.</p>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Complete Profile</h2>
                  <Button variant="ghost" size="sm" onClick={() => setRole(null)}>Change Role</Button>
                </div>
                <div className="space-y-4">
                  <Input
                    label={role === 'RESTAURANT' ? 'Restaurant Name' : 'NGO Name'}
                    placeholder={role === 'RESTAURANT' ? 'e.g. Saravana Bhavan' : 'e.g. City Hope Foundation'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Start Impacting
                </Button>
                <p className="text-center text-xs text-gray-400 font-medium">
                  By joining, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
