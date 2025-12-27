import { fillOffers, setOffersLoadingStatus } from './action';
import { Offer } from '../types/offer';

export type OffersState = {
  offers: Offer[];
  isLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
};

type OffersAction = ReturnType<typeof fillOffers> | ReturnType<typeof setOffersLoadingStatus>;

export const offersReducer = (state: OffersState = initialState, action: OffersAction): OffersState => {
  switch (action.type) {
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
    default:
      return state;
  }
};

