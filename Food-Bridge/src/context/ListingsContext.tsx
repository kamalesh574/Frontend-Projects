/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Listing, FoodRequest, ListingStatus, RequestStatus } from '../types';
import { generateId } from '../utils';

interface ListingsState {
  listings: Listing[];
  requests: FoodRequest[];
}

type ListingsAction =
  | { type: 'SET_LISTINGS'; payload: Listing[] }
  | { type: 'SET_REQUESTS'; payload: FoodRequest[] }
  | { type: 'ADD_LISTING'; payload: Listing }
  | { type: 'UPDATE_LISTING_STATUS'; payload: { id: string; status: ListingStatus } }
  | { type: 'ADD_REQUEST'; payload: FoodRequest }
  | { type: 'UPDATE_REQUEST_STATUS'; payload: { id: string; status: RequestStatus } };

const ListingsContext = createContext<{
  state: ListingsState;
  addListing: (listing: Omit<Listing, 'id' | 'status' | 'createdAt'>) => void;
  requestPickup: (listingId: string, ngoId: string, ngoName: string) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
} | null>(null);

const listingsReducer = (state: ListingsState, action: ListingsAction): ListingsState => {
  switch (action.type) {
    case 'SET_LISTINGS':
      return { ...state, listings: action.payload };
    case 'SET_REQUESTS':
      return { ...state, requests: action.payload };
    case 'ADD_LISTING':
      return { ...state, listings: [action.payload, ...state.listings] };
    case 'UPDATE_LISTING_STATUS':
      return {
        ...state,
        listings: state.listings.map((l) =>
          l.id === action.payload.id ? { ...l, status: action.payload.status } : l
        ),
      };
    case 'ADD_REQUEST':
      return { ...state, requests: [action.payload, ...state.requests] };
    case 'UPDATE_REQUEST_STATUS':
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.payload.id ? { ...r, status: action.payload.status } : r
        ),
      };
    default:
      return state;
  }
};
const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    restaurantId: 'res1',
    restaurantName: 'Sangeetha Veg Restaurant',
    foodName: 'Mini Ghee Idli & Sambar',
    quantity: 12,
    unit: 'plates',
    type: 'VEG',
    preparedTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    location: 'GN Chetty Road, T. Nagar',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/idli/400/300',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    restaurantId: 'res2',
    restaurantName: 'Thalappakatti Biriyani',
    foodName: 'Dindigul Chicken Biriyani',
    quantity: 8,
    unit: 'kg',
    type: 'NON-VEG',
    preparedTime: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    location: 'LB Road, Adyar',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/biriyani/400/300',
    createdAt: new Date().toISOString(),
  },
];

export const ListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(listingsReducer, {
    listings: [],
    requests: [],
  });

  useEffect(() => {
    const savedListings = localStorage.getItem('food_bridge_listings');
    const savedRequests = localStorage.getItem('food_bridge_requests');

    if (savedListings) {
      dispatch({ type: 'SET_LISTINGS', payload: JSON.parse(savedListings) });
    } else {
      dispatch({ type: 'SET_LISTINGS', payload: MOCK_LISTINGS });
    }

    if (savedRequests) {
      dispatch({ type: 'SET_REQUESTS', payload: JSON.parse(savedRequests) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('food_bridge_listings', JSON.stringify(state.listings));
    localStorage.setItem('food_bridge_requests', JSON.stringify(state.requests));
  }, [state.listings, state.requests]);

  const addListing = (listingData: Omit<Listing, 'id' | 'status' | 'createdAt'>) => {
    const newListing: Listing = {
      ...listingData,
      id: generateId(),
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_LISTING', payload: newListing });
  };

  const requestPickup = (listingId: string, ngoId: string, ngoName: string) => {
    const newRequest: FoodRequest = {
      id: generateId(),
      listingId,
      ngoId,
      ngoName,
      status: 'PENDING',
      requestedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_REQUEST', payload: newRequest });
    dispatch({ type: 'UPDATE_LISTING_STATUS', payload: { id: listingId, status: 'REQUESTED' } });
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    const request = state.requests.find((r) => r.id === requestId);
    if (!request) return;

    dispatch({ type: 'UPDATE_REQUEST_STATUS', payload: { id: requestId, status } });

    if (status === 'APPROVED') {
      dispatch({ type: 'UPDATE_LISTING_STATUS', payload: { id: request.listingId, status: 'PICKED' } });
    } else if (status === 'CANCELLED') {
      dispatch({ type: 'UPDATE_LISTING_STATUS', payload: { id: request.listingId, status: 'AVAILABLE' } });
    }
  };

  return (
    <ListingsContext.Provider value={{ state, addListing, requestPickup, updateRequestStatus }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) throw new Error('useListings must be used within ListingsProvider');
  return context;
};
