import { combineReducers } from '@reduxjs/toolkit';
import { cityReducer } from './city-reducer';
import { offersReducer } from './offers-reducer';
import { offerReducer } from './offer-reducer';
import { userReducer } from './user-reducer';

export const reducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  offer: offerReducer,
  user: userReducer,
});

export type State = ReturnType<typeof reducer>;
export type { AuthorizationStatus } from './user-reducer';

