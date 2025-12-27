import { changeCity } from './action';

export type CityState = {
  city: string;
};

const initialState: CityState = {
  city: 'Paris',
};

type CityAction = ReturnType<typeof changeCity>;

export const cityReducer = (state: CityState = initialState, action: CityAction): CityState => {
  switch (action.type) {
    case 'city/change':
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

