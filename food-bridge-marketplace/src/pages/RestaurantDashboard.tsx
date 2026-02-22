/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Plus, Utensils, Clock, MapPin, CheckCircle, AlertCircle, TrendingUp, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { useCountdown } from '../hooks/useCountdown';
import { FoodType } from '../types';

const ListingRow: React.FC<{ listing: any }> = ({ listing }) => {
  const timeLeft = useCountdown(listing.expiryTime);

  const statusVariants: Record<string, any> = {
    AVAILABLE: 'success',
    REQUESTED: 'warning',
    PICKED: 'info',
    EXPIRED: 'error',
  };

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img src={listing.imageUrl || 'https://picsum.photos/seed/food/100/100'} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
          <span className="font-bold text-gray-900">{listing.foodName}</span>
        </div>
      </td>
      <td className="py-4 px-4 font-semibold text-gray-600">
        {listing.quantity} {listing.unit}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2 text-sm font-bold text-gray-500">
          <Clock className="w-4 h-4" />
          <span className={timeLeft === 'Expired' ? 'text-rose-500' : 'text-emerald-600'}>{timeLeft}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <Badge variant={statusVariants[listing.status]}>{listing.status}</Badge>
      </td>
    </tr>
  );
};

const RestaurantDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: listingsState, addListing } = useListings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    unit: 'kg',
    type: 'VEG' as FoodType,
    expiryHours: '4',
    location: authState.user?.location || '',
  });

  const restaurantListings = useMemo(() => {
    return listingsState.listings.filter((l) => l.restaurantId === authState.user?.id);
  }, [listingsState.listings, authState.user?.id]);

  const stats = useMemo(() => {
    return {
      total: restaurantListings.length,
      active: restaurantListings.filter((l) => l.status === 'AVAILABLE').length,
      claimed: restaurantListings.filter((l) => l.status === 'PICKED').length,
      expired: restaurantListings.filter((l) => l.status === 'EXPIRED').length,
    };
  }, [restaurantListings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const expiry = new Date(now.getTime() + parseInt(formData.expiryHours) * 60 * 60 * 1000);

    addListing({
      restaurantId: authState.user!.id,
      restaurantName: authState.user!.name,
      foodName: formData.foodName,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      type: formData.type,
      preparedTime: now.toISOString(),
      expiryTime: expiry.toISOString(),
      location: formData.location,
      imageUrl: `https://picsum.photos/seed/${formData.foodName}/400/300`,
    });

    setIsModalOpen(false);
    setFormData({
      foodName: '',
      quantity: '',
      unit: 'kg',
      type: 'VEG',
      expiryHours: '4',
      location: authState.user?.location || '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Restaurant Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back, {authState.user?.name}. Ready to make a difference?</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-emerald-100">
          <Plus className="w-5 h-5 mr-2" />
          Add Surplus Food
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Donations', value: stats.total, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Listings', value: stats.active, icon: Utensils, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Food Claimed', value: stats.claimed, icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Expired Items', value: stats.expired, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900">{stat.value}</div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Listings Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Recent Listings</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4">Food Item</th>
                <th className="py-4 px-4">Quantity</th>
                <th className="py-4 px-4">Expires In</th>
                <th className="py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {restaurantListings.length > 0 ? (
                restaurantListings.map((l) => <ListingRow key={l.id} listing={l} />)
              ) : (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                        <Utensils className="w-8 h-8" />
                      </div>
                      <p className="text-gray-400 font-bold">No listings yet. Start by adding your surplus food!</p>
                      <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Add Food</Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Food Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Surplus Food">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Food Name"
            placeholder="e.g. Mixed Vegetable Curry"
            value={formData.foodName}
            onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              placeholder="10"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Unit</label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="plates">Plates</option>
                <option value="packets">Packets</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Food Type</label>
              <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'VEG' })}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.type === 'VEG' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
                >
                  Veg
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'NON-VEG' })}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.type === 'NON-VEG' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500'}`}
                >
                  Non-Veg
                </button>
              </div>
            </div>
            <Input
              label="Expiry (Hours)"
              type="number"
              value={formData.expiryHours}
              onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
              required
            />
          </div>
          <Input
            label="Pickup Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Button type="submit" className="w-full" size="lg">List Food</Button>
        </form>
      </Modal>
    </div>
  );
};

export default RestaurantDashboard;
