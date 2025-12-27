import { Offer } from '../types/offer';
import { User } from '../types/user';
import { Review } from '../types/review';
import {
  changeCity,
  fillOffers,
  setOffersLoadingStatus,
  setCurrentOffer,
  setCurrentOfferLoadingStatus,
  requireAuthorization,
  setUser,
  logout,
  setNearbyOffers,
  setReviews,
  setOfferNotFound,
} from './action';

export type AuthorizationStatus = 'UNKNOWN' | 'AUTH' | 'NO_AUTH';

export type State = {
  city: string;
  offers: Offer[];
  isLoading: boolean;
  currentOffer: Offer | null;
  isCurrentOfferLoading: boolean;
  offerNotFound: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  nearbyOffers: Offer[];
  reviews: Review[];
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  currentOffer: null,
  isCurrentOfferLoading: false,
  offerNotFound: false,
  authorizationStatus: 'UNKNOWN',
  user: null,
  nearbyOffers: [],
  reviews: [],
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof fillOffers> | ReturnType<typeof setOffersLoadingStatus> | ReturnType<typeof setCurrentOffer> | ReturnType<typeof setCurrentOfferLoadingStatus> | ReturnType<typeof requireAuthorization> | ReturnType<typeof setUser> | ReturnType<typeof logout> | ReturnType<typeof setNearbyOffers> | ReturnType<typeof setReviews> | ReturnType<typeof setOfferNotFound>;

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'city/change':
      return {
        ...state,
        city: action.payload,
      };
    case 'offers/fill':
      return {
        ...state,
        offers: action.payload,
      };
    case 'offers/setLoadingStatus':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'offer/setCurrent':
      return {
        ...state,
        currentOffer: action.payload,
      };
    case 'offer/setLoadingStatus':
      return {
        ...state,
        isCurrentOfferLoading: action.payload,
      };
    case 'user/requireAuthorization':
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case 'user/setUser':
      return {
        ...state,
        user: action.payload,
      };
    case 'user/logout':
      return {
        ...state,
        authorizationStatus: 'NO_AUTH',
        user: null,
      };
    case 'offer/setNearby':
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    case 'offer/setReviews':
      return {
        ...state,
        reviews: action.payload,
      };
    case 'offer/setNotFound':
      return {
        ...state,
        offerNotFound: action.payload,
      };
    default:
      return state;
  }
};

