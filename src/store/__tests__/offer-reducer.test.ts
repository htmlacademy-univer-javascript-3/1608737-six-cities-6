import { describe, it, expect } from 'vitest';
import { offerReducer } from '../offer-reducer';
import {
  setCurrentOffer,
  setCurrentOfferLoadingStatus,
  setNearbyOffers,
  setReviews,
  setOfferNotFound,
} from '../action';
import { OfferState } from '../offer-reducer';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

describe('offerReducer', () => {
  const initialState: OfferState = {
    currentOffer: null,
    isCurrentOfferLoading: false,
    offerNotFound: false,
    nearbyOffers: [],
    reviews: [],
  };

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    description: 'Test description',
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Kitchen'],
    host: {
      name: 'Test Host',
      avatarUrl: 'test-avatar.jpg',
      isPro: false,
    },
    images: ['image1.jpg'],
    previewImage: 'preview1.jpg',
  };

  const mockNearbyOffers: Offer[] = [
    {
      ...mockOffer,
      id: '2',
      title: 'Nearby Offer 1',
    },
    {
      ...mockOffer,
      id: '3',
      title: 'Nearby Offer 2',
    },
  ];

  const mockReviews: Review[] = [
    {
      id: '1',
      date: '2025-12-25T10:00:00.000Z',
      user: {
        name: 'Oliver.conner',
        avatarUrl: 'avatar1.jpg',
        isPro: false,
      },
      comment: 'Great place!',
      rating: 5,
    },
    {
      id: '2',
      date: '2025-12-25T10:00:00.000Z',
      user: {
        name: 'Jane Smith',
        avatarUrl: 'avatar2.jpg',
        isPro: true,
      },
      comment: 'Nice apartment',
      rating: 4,
    },
  ];

  it('should return the initial state when passed an empty action', () => {
    const result = offerReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should return the initial state when passed an unknown action', () => {
    const result = offerReducer(initialState, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should set current offer on setCurrentOffer action', () => {
    const action = setCurrentOffer(mockOffer);
    const result = offerReducer(initialState, action);
    
    expect(result.currentOffer).toEqual(mockOffer);
    expect(result.currentOffer?.id).toBe('1');
  });

  it('should set current offer to null on setCurrentOffer action', () => {
    const state: OfferState = { ...initialState, currentOffer: mockOffer };
    const action = setCurrentOffer(null);
    const result = offerReducer(state, action);
    
    expect(result.currentOffer).toBeNull();
  });

  it('should set loading status to true on setCurrentOfferLoadingStatus action', () => {
    const action = setCurrentOfferLoadingStatus(true);
    const result = offerReducer(initialState, action);
    
    expect(result.isCurrentOfferLoading).toBe(true);
  });

  it('should set loading status to false on setCurrentOfferLoadingStatus action', () => {
    const state: OfferState = { ...initialState, isCurrentOfferLoading: true };
    const action = setCurrentOfferLoadingStatus(false);
    const result = offerReducer(state, action);
    
    expect(result.isCurrentOfferLoading).toBe(false);
  });

  it('should set nearby offers on setNearbyOffers action', () => {
    const action = setNearbyOffers(mockNearbyOffers);
    const result = offerReducer(initialState, action);
    
    expect(result.nearbyOffers).toEqual(mockNearbyOffers);
    expect(result.nearbyOffers.length).toBe(2);
  });

  it('should set empty nearby offers array', () => {
    const state: OfferState = { ...initialState, nearbyOffers: mockNearbyOffers };
    const action = setNearbyOffers([]);
    const result = offerReducer(state, action);
    
    expect(result.nearbyOffers).toEqual([]);
  });

  it('should set reviews on setReviews action', () => {
    const action = setReviews(mockReviews);
    const result = offerReducer(initialState, action);
    
    expect(result.reviews).toEqual(mockReviews);
    expect(result.reviews.length).toBe(2);
  });

  it('should set empty reviews array', () => {
    const state: OfferState = { ...initialState, reviews: mockReviews };
    const action = setReviews([]);
    const result = offerReducer(state, action);
    
    expect(result.reviews).toEqual([]);
  });

  it('should set offer not found to true on setOfferNotFound action', () => {
    const action = setOfferNotFound(true);
    const result = offerReducer(initialState, action);
    
    expect(result.offerNotFound).toBe(true);
  });

  it('should set offer not found to false on setOfferNotFound action', () => {
    const state: OfferState = { ...initialState, offerNotFound: true };
    const action = setOfferNotFound(false);
    const result = offerReducer(state, action);
    
    expect(result.offerNotFound).toBe(false);
  });
});

