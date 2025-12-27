import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './index';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from './reducer';
import { User, AuthInfo } from '../types/user';

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

export const requireAuthorization = (status: AuthorizationStatus) => ({
  type: 'user/requireAuthorization' as const,
  payload: status,
});

export const setUser = (user: User | null) => ({
  type: 'user/setUser' as const,
  payload: user,
});

const TOKEN_KEY = 'six-cities-token';

export const checkAuth = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.get<AuthInfo>('/login');
    localStorage.setItem(TOKEN_KEY, data.token);
    dispatch(requireAuthorization('AUTH'));
    dispatch(setUser({
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
      isPro: data.isPro,
    }));
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(requireAuthorization('NO_AUTH'));
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    dispatch(requireAuthorization('AUTH'));
    dispatch(setUser({
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
      isPro: data.isPro,
    }));
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return {
    type: 'user/logout' as const,
  };
};

