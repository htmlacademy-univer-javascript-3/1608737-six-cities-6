import { setCurrentOffer, setCurrentOfferLoadingStatus, setNearbyOffers, setReviews, setOfferNotFound } from './action';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export type OfferState = {
  currentOffer: Offer | null;
  isCurrentOfferLoading: boolean;
  offerNotFound: boolean;
  nearbyOffers: Offer[];
  reviews: Review[];
};

const initialState: OfferState = {
  currentOffer: null,
  isCurrentOfferLoading: false,
  offerNotFound: false,
  nearbyOffers: [],
  reviews: [],
};

type OfferAction = ReturnType<typeof setCurrentOffer> 
  | ReturnType<typeof setCurrentOfferLoadingStatus>
  | ReturnType<typeof setNearbyOffers>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof setOfferNotFound>;

export const offerReducer = (state: OfferState = initialState, action: OfferAction): OfferState => {
  switch (action.type) {
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

