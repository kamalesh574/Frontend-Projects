/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Clock, MapPin, Utensils, Info, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { useCountdown } from '../hooks/useCountdown';
import { Listing, FoodType } from '../types';

const FoodCard: React.FC<{ listing: Listing; onRequest: (id: string) => void }> = ({ listing, onRequest }) => {
  const timeLeft = useCountdown(listing.expiryTime);
  const isExpired = timeLeft === 'Expired';
  const isRequested = listing.status === 'REQUESTED';

  return (
    <Card hoverable className="flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.imageUrl || 'https://picsum.photos/seed/food/400/300'}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <Badge variant={listing.type === 'VEG' ? 'success' : 'error'} className="shadow-md">
            {listing.type}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-2 text-xs font-black">
            <Clock className={`w-3.5 h-3.5 ${isExpired ? 'text-rose-500' : 'text-emerald-600'}`} />
            <span className={isExpired ? 'text-rose-500' : 'text-emerald-600'}>{timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{listing.foodName}</h3>
            <p className="text-sm font-bold text-emerald-600">{listing.restaurantName}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-gray-900">{listing.quantity}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{listing.unit}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="line-clamp-1">{listing.location}</span>
        </div>

        <div className="pt-4 mt-auto">
          <Button
            className="w-full"
            variant={isRequested ? 'secondary' : 'primary'}
            disabled={isExpired || isRequested}
            onClick={() => onRequest(listing.id)}
          >
            {isRequested ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Requested
              </>
            ) : (
              'Request Pickup'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const NGODashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: listingsState, requestPickup } = useListings();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | FoodType>('ALL');

  const filteredListings = useMemo(() => {
    return listingsState.listings.filter((l) => {
      const matchesSearch = l.foodName.toLowerCase().includes(search.toLowerCase()) ||
                          l.restaurantName.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'ALL' || l.type === filterType;
      const isAvailable = l.status === 'AVAILABLE' || l.status === 'REQUESTED';
      return matchesSearch && matchesType && isAvailable;
    });
  }, [listingsState.listings, search, filterType]);

  const handleRequest = (listingId: string) => {
    if (authState.user) {
      requestPickup(listingId, authState.user.id, authState.user.name);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Available Food</h1>
          <p className="text-gray-500 font-medium">Find surplus food near you and feed those in need.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search food or restaurant..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex p-1 bg-white border border-gray-200 rounded-xl">
            {(['ALL', 'VEG', 'NON-VEG'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === type ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </header>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredListings.map((l) => (
              <motion.div
                key={l.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FoodCard listing={l} onRequest={handleRequest} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
            <Utensils className="w-12 h-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">No food available right now</h3>
            <p className="text-gray-500 max-w-sm">Check back later or try adjusting your filters to find available listings.</p>
          </div>
          <Button variant="outline" onClick={() => { setSearch(''); setFilterType('ALL'); }}>
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-emerald-600 to-indigo-600 border-none p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              <span>Guidelines</span>
            </div>
            <h2 className="text-3xl font-black">Safety First</h2>
            <p className="text-emerald-50 max-w-xl font-medium">
              Always inspect food quality upon pickup. Ensure your transport vehicles are clean 
              and follow proper food handling protocols to maintain safety.
            </p>
          </div>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 border-none">
            View Safety Handbook
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </Card>
    </div>
  );
};

export default NGODashboard;
