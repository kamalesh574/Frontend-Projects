/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin, User } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <Heart className="text-white w-6 h-6" fill="currentColor" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">
                Food<span className="text-emerald-600">Bridge</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Connecting surplus food from Chennai's top restaurants with local NGOs to ensure no one goes hungry. Join our mission to reduce waste across Tamil Nadu.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/kamalesh574" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/kamalesh-p" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">How it Works</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">For Restaurants</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">For NGOs</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">Impact Stories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">Volunteer</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-500 text-sm font-medium">
                <User className="w-4 h-4 text-emerald-600" />
                <span>Kamalesh</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm font-medium">
                <Mail className="w-4 h-4 text-emerald-600" />
                <a href="mailto:kamaleshp.004@gmail.com" className="hover:text-emerald-600 transition-colors">kamaleshp.004@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm font-medium">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Chennai</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs font-medium">
            © {new Date().getFullYear()} FoodBridge Marketplace. All rights reserved. Built with ❤️ by Kamalesh in Chennai.
          </p>
        </div>
      </div>
    </footer>
  );
};