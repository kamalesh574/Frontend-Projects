/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Clock, CheckCircle2, XCircle, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

const RequestCard: React.FC<{ request: any; listing: any; onUpdate: any }> = ({ request, listing, onUpdate }) => {
  const statusColors: Record<string, any> = {
    PENDING: 'warning',
    APPROVED: 'success',
    COMPLETED: 'info',
    CANCELLED: 'error',
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{listing?.foodName || 'Unknown Item'}</h3>
            <p className="text-sm font-bold text-emerald-600">{listing?.restaurantName || 'Unknown Restaurant'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={statusColors[request.status]}>{request.status}</Badge>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {new Date(request.requestedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pickup Location</span>
          </div>
          <p className="text-sm font-semibold text-gray-700">{listing?.location || 'Not specified'}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Quantity</span>
          </div>
          <p className="text-sm font-semibold text-gray-700">{listing?.quantity} {listing?.unit}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>
          <p className="text-sm font-semibold text-gray-700">+1 (555) 000-0000</p>
        </div>
      </div>

      {request.status === 'PENDING' && (
        <div className="flex items-center space-x-4 pt-4">
          <Button size="sm" className="flex-1" onClick={() => onUpdate(request.id, 'APPROVED')}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Confirm Pickup
          </Button>
          <Button size="sm" variant="ghost" className="text-rose-500 hover:bg-rose-50" onClick={() => onUpdate(request.id, 'CANCELLED')}>
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}

      {request.status === 'APPROVED' && (
        <div className="pt-4">
          <Button variant="outline" size="sm" className="w-full" onClick={() => onUpdate(request.id, 'COMPLETED')}>
            Mark as Completed
          </Button>
        </div>
      )}
    </Card>
  );
};

const RequestsPage: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: listingsState, updateRequestStatus } = useListings();

  const myRequests = useMemo(() => {
    return listingsState.requests
      .filter((r) => r.ngoId === authState.user?.id)
      .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }, [listingsState.requests, authState.user?.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header>
        <h1 className="text-3xl font-black text-gray-900">My Requests</h1>
        <p className="text-gray-500 font-medium">Track your food pickup requests and history.</p>
      </header>

      <div className="space-y-6">
        {myRequests.length > 0 ? (
          myRequests.map((r) => {
            const listing = listingsState.listings.find((l) => l.id === r.listingId);
            return (
              <RequestCard
                key={r.id}
                request={r}
                listing={listing}
                onUpdate={updateRequestStatus}
              />
            );
          })
        ) : (
          <div className="py-32 flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
              <ClipboardList className="w-10 h-10" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900">No requests yet</h3>
              <p className="text-gray-500">Browse available food and start making an impact.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
