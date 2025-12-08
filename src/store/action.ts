import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './index';
import { Offer } from '../types/offer';

export const changeCity = (city: string) => ({
  type: 'city/change' as const,
  payload: city,
});

export const fillOffers = (offers: Offer[]) => ({
  type: 'offers/fill' as const,
  payload: offers,
});

export const setOffersLoadingStatus = (isLoading: boolean) => ({
  type: 'offers/setLoadingStatus' as const,
  payload: isLoading,
});

export const fetchOffers = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  dispatch(setOffersLoadingStatus(true));
  try {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(fillOffers(data));
  } catch (error) {
    console.error('Failed to fetch offers:', error);
  } finally {
    dispatch(setOffersLoadingStatus(false));
  }
};

export const setCurrentOffer = (offer: Offer | null) => ({
  type: 'offer/setCurrent' as const,
  payload: offer,
});

export const setCurrentOfferLoadingStatus = (isLoading: boolean) => ({
  type: 'offer/setLoadingStatus' as const,
  payload: isLoading,
});

export const fetchOfferById = (id: string) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  dispatch(setCurrentOfferLoadingStatus(true));
  try {
    const { data } = await api.get<Offer>(`/offers/${id}`);
    dispatch(setCurrentOffer(data));
  } catch (error) {
    console.error('Failed to fetch offer:', error);
    dispatch(setCurrentOffer(null));
  } finally {
    dispatch(setCurrentOfferLoadingStatus(false));
  }
};

