import { Offer } from '../types/offer';
import { changeCity, fillOffers, setOffersLoadingStatus, setCurrentOffer, setCurrentOfferLoadingStatus } from './action';

export type State = {
  city: string;
  offers: Offer[];
  isLoading: boolean;
  currentOffer: Offer | null;
  isCurrentOfferLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  currentOffer: null,
  isCurrentOfferLoading: false,
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof fillOffers> | ReturnType<typeof setOffersLoadingStatus> | ReturnType<typeof setCurrentOffer> | ReturnType<typeof setCurrentOfferLoadingStatus>;

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
    default:
      return state;
  }
};

