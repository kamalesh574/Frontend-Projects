/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'RESTAURANT' | 'NGO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
}

export type FoodType = 'VEG' | 'NON-VEG';
export type ListingStatus = 'AVAILABLE' | 'REQUESTED' | 'PICKED' | 'EXPIRED';

export interface Listing {
  id: string;
  restaurantId: string;
  restaurantName: string;
  foodName: string;
  quantity: number;
  unit: string;
  type: FoodType;
  preparedTime: string; // ISO string
  expiryTime: string; // ISO string
  location: string;
  status: ListingStatus;
  imageUrl?: string;
  createdAt: string;
}

export type RequestStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';

export interface FoodRequest {
  id: string;
  listingId: string;
  ngoId: string;
  ngoName: string;
  status: RequestStatus;
  requestedAt: string;
}

export interface ImpactStats {
  totalDonations: number;
  activeListings: number;
  foodClaimed: number;
  expiredItems: number;
}
