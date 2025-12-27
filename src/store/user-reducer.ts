import { requireAuthorization, setUser, logout } from './action';
import { User } from '../types/user';

export type AuthorizationStatus = 'UNKNOWN' | 'AUTH' | 'NO_AUTH';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: UserState = {
  authorizationStatus: 'UNKNOWN',
  user: null,
};

type UserAction = ReturnType<typeof requireAuthorization> 
  | ReturnType<typeof setUser> 
  | ReturnType<typeof logout>;

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
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

