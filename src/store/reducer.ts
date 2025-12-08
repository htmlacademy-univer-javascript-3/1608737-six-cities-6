import { Offer } from '../mocks/offers';
import { changeCity, fillOffers } from './action';

export type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: 'Paris',
  offers: [],
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof fillOffers>;

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
    default:
      return state;
  }
};

