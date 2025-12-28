import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosInstance } from 'axios';
import { fetchOffers, fetchOfferById, postReview } from '../action';
import { fillOffers, setOffersLoadingStatus, setCurrentOffer, setNearbyOffers, setReviews, setOfferNotFound, setCurrentOfferLoadingStatus } from '../action';
import { Offer } from '../../types/offer';
import { Review, ReviewPost } from '../../types/review';

describe('async actions', () => {
  let mockAxios: MockAdapter;
  let api: AxiosInstance;
  let dispatch: ReturnType<typeof vi.fn>;
  let getState: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'https://test-api.com',
    });
    mockAxios = new MockAdapter(api);
    dispatch = vi.fn();
    getState = vi.fn(() => ({
      offer: {
        reviews: [],
      },
    }));
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('fetchOffers', () => {
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
    ];

    it('should fetch offers successfully', async () => {
      mockAxios.onGet('/offers').reply(200, mockOffers);

      const thunk = fetchOffers();
      await thunk(dispatch, getState, api);

      expect(dispatch).toHaveBeenCalledWith(setOffersLoadingStatus(true));
      expect(dispatch).toHaveBeenCalledWith(fillOffers(mockOffers));
      expect(dispatch).toHaveBeenCalledWith(setOffersLoadingStatus(false));
    });

    it('should handle fetch error', async () => {
      mockAxios.onGet('/offers').reply(500, { error: 'Server Error' });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const thunk = fetchOffers();
      await thunk(dispatch, getState, api);

      expect(dispatch).toHaveBeenCalledWith(setOffersLoadingStatus(true));
      expect(dispatch).toHaveBeenCalledWith(setOffersLoadingStatus(false));
      expect(dispatch).not.toHaveBeenCalledWith(fillOffers(expect.anything()));
      
      consoleSpy.mockRestore();
    });
  });

  describe('fetchOfferById', () => {
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

    const mockNearbyOffers: Offer[] = [mockOffer];
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
    ];

    it('should fetch offer by id successfully', async () => {
      mockAxios.onGet('/offers/1').reply(200, mockOffer);
      mockAxios.onGet('/offers/1/nearby').reply(200, mockNearbyOffers);
      mockAxios.onGet('/comments/1').reply(200, mockReviews);

      const thunk = fetchOfferById('1');
      await thunk(dispatch, getState, api);

      expect(dispatch).toHaveBeenCalledWith(setCurrentOfferLoadingStatus(true));
      expect(dispatch).toHaveBeenCalledWith(setOfferNotFound(false));
      expect(dispatch).toHaveBeenCalledWith(setCurrentOffer(mockOffer));
      expect(dispatch).toHaveBeenCalledWith(setNearbyOffers(mockNearbyOffers));
      expect(dispatch).toHaveBeenCalledWith(setReviews(mockReviews));
      expect(dispatch).toHaveBeenCalledWith(setOfferNotFound(false));
      expect(dispatch).toHaveBeenCalledWith(setCurrentOfferLoadingStatus(false));
    });

    it('should handle 404 error', async () => {
      mockAxios.onGet('/offers/999').reply(404);

      const thunk = fetchOfferById('999');
      await thunk(dispatch, getState, api);

      expect(dispatch).toHaveBeenCalledWith(setCurrentOfferLoadingStatus(true));
      expect(dispatch).toHaveBeenCalledWith(setOfferNotFound(false));
      expect(dispatch).toHaveBeenCalledWith(setCurrentOffer(null));
      expect(dispatch).toHaveBeenCalledWith(setOfferNotFound(true));
      expect(dispatch).toHaveBeenCalledWith(setCurrentOfferLoadingStatus(false));
    });

    it('should handle other errors', async () => {
      mockAxios.onGet('/offers/1').reply(500);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const thunk = fetchOfferById('1');
      await thunk(dispatch, getState, api);

      expect(dispatch).toHaveBeenCalledWith(setCurrentOfferLoadingStatus(true));
      expect(dispatch).toHaveBeenCalledWith(setCurrentOffer(null));
      expect(dispatch).toHaveBeenCalledWith(setOfferNotFound(false));
      expect(dispatch).toHaveBeenCalledWith(setCurrentOfferLoadingStatus(false));
      
      consoleSpy.mockRestore();
    });
  });

  describe('postReview', () => {
    const mockReviewPost: ReviewPost = {
      comment: 'Great place!',
      rating: 5,
    };

    const mockReview: Review = {
      id: '1',
      date: '2025-12-25T10:00:00.000Z',
      user: {
        name: 'Oliver.conner',
        avatarUrl: 'avatar1.jpg',
        isPro: false,
      },
      comment: 'Great place!',
      rating: 5,
    };

    const existingReviews: Review[] = [
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

    it('should post review successfully', async () => {
      mockAxios.onPost('/comments/1', mockReviewPost).reply(200, mockReview);
      
      const getStateWithReviews = vi.fn(() => ({
        offer: {
          reviews: existingReviews,
        },
      }));

      const thunk = postReview('1', mockReviewPost);
      const result = await thunk(dispatch, getStateWithReviews, api);

      expect(dispatch).toHaveBeenCalledWith(setReviews([mockReview, ...existingReviews]));
      expect(result).toEqual(mockReview);
    });

    it('should handle post review error', async () => {
      mockAxios.onPost('/comments/1', mockReviewPost).reply(400, { error: 'Bad Request' });

      const thunk = postReview('1', mockReviewPost);
      
      await expect(thunk(dispatch, getState, api)).rejects.toThrow();
      expect(dispatch).not.toHaveBeenCalledWith(setReviews(expect.anything()));
    });
  });
});

