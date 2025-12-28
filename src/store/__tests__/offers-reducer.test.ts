import { describe, it, expect } from 'vitest';
import { offersReducer } from '../offers-reducer';
import { fillOffers, setOffersLoadingStatus } from '../action';
import { OffersState } from '../offers-reducer';
import { Offer } from '../../types/offer';

describe('offersReducer', () => {
  const initialState: OffersState = {
    offers: [],
    isLoading: false,
  };

  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Test Offer 1',
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
    },
    {
      id: '2',
      title: 'Test Offer 2',
      type: 'room',
      price: 80,
      city: {
        name: 'Amsterdam',
        location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
      },
      location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
      isFavorite: true,
      isPremium: true,
      rating: 4.8,
      description: 'Test description 2',
      bedrooms: 1,
      maxAdults: 2,
      goods: ['Wi-Fi'],
      host: {
        name: 'Test Host 2',
        avatarUrl: 'test-avatar2.jpg',
        isPro: true,
      },
      images: ['image2.jpg'],
      previewImage: 'preview2.jpg',
    },
  ];

  it('should return the initial state when passed an empty action', () => {
    const result = offersReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should return the initial state when passed an unknown action', () => {
    const result = offersReducer(initialState, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should fill offers on fillOffers action', () => {
    const action = fillOffers(mockOffers);
    const result = offersReducer(initialState, action);
    
    expect(result.offers).toEqual(mockOffers);
    expect(result.offers.length).toBe(2);
    expect(result.isLoading).toBe(false);
  });

  it('should set loading status to true on setOffersLoadingStatus action', () => {
    const action = setOffersLoadingStatus(true);
    const result = offersReducer(initialState, action);
    
    expect(result.isLoading).toBe(true);
    expect(result.offers).toEqual([]);
  });

  it('should set loading status to false on setOffersLoadingStatus action', () => {
    const state: OffersState = { offers: [], isLoading: true };
    const action = setOffersLoadingStatus(false);
    const result = offersReducer(state, action);
    
    expect(result.isLoading).toBe(false);
  });

  it('should replace existing offers when fillOffers is called', () => {
    const state: OffersState = { offers: mockOffers, isLoading: false };
    const newOffers: Offer[] = [mockOffers[0]];
    const action = fillOffers(newOffers);
    const result = offersReducer(state, action);
    
    expect(result.offers).toEqual(newOffers);
    expect(result.offers.length).toBe(1);
  });

  it('should handle empty offers array', () => {
    const state: OffersState = { offers: mockOffers, isLoading: false };
    const action = fillOffers([]);
    const result = offersReducer(state, action);
    
    expect(result.offers).toEqual([]);
    expect(result.offers.length).toBe(0);
  });
});

