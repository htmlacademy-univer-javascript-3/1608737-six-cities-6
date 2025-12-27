import { Offer } from '../types/offer';
import { User } from '../types/user';
import { changeCity, fillOffers, setOffersLoadingStatus, setCurrentOffer, setCurrentOfferLoadingStatus, requireAuthorization, setUser, logout } from './action';

export type AuthorizationStatus = 'UNKNOWN' | 'AUTH' | 'NO_AUTH';

export type State = {
  city: string;
  offers: Offer[];
  isLoading: boolean;
  currentOffer: Offer | null;
  isCurrentOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  currentOffer: null,
  isCurrentOfferLoading: false,
  authorizationStatus: 'UNKNOWN',
  user: null,
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof fillOffers> | ReturnType<typeof setOffersLoadingStatus> | ReturnType<typeof setCurrentOffer> | ReturnType<typeof setCurrentOfferLoadingStatus> | ReturnType<typeof requireAuthorization> | ReturnType<typeof setUser> | ReturnType<typeof logout>;

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
    default:
      return state;
  }
};

