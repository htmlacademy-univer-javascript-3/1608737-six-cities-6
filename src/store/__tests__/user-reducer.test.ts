import { describe, it, expect } from 'vitest';
import { userReducer } from '../user-reducer';
import { requireAuthorization, setUser, logout } from '../action';
import { UserState, AuthorizationStatus } from '../user-reducer';
import { User } from '../../types/user';

describe('userReducer', () => {
  const initialState: UserState = {
    authorizationStatus: 'UNKNOWN',
    user: null,
  };

  const mockUser: User = {
    email: 'test@example.com',
    name: 'Test User',
    avatarUrl: 'avatar.jpg',
    isPro: false,
  };

  it('should return the initial state when passed an empty action', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should return the initial state when passed an unknown action', () => {
    const result = userReducer(initialState, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should set authorization status to AUTH on requireAuthorization action', () => {
    const action = requireAuthorization('AUTH');
    const result = userReducer(initialState, action);
    
    expect(result.authorizationStatus).toBe('AUTH');
    expect(result.user).toBeNull();
  });

  it('should set authorization status to NO_AUTH on requireAuthorization action', () => {
    const action = requireAuthorization('NO_AUTH');
    const result = userReducer(initialState, action);
    
    expect(result.authorizationStatus).toBe('NO_AUTH');
    expect(result.user).toBeNull();
  });

  it('should set authorization status to UNKNOWN on requireAuthorization action', () => {
    const state: UserState = { authorizationStatus: 'AUTH', user: mockUser };
    const action = requireAuthorization('UNKNOWN');
    const result = userReducer(state, action);
    
    expect(result.authorizationStatus).toBe('UNKNOWN');
    expect(result.user).toEqual(mockUser);
  });

  it('should set user on setUser action', () => {
    const action = setUser(mockUser);
    const result = userReducer(initialState, action);
    
    expect(result.user).toEqual(mockUser);
    expect(result.user?.email).toBe('test@example.com');
    expect(result.authorizationStatus).toBe('UNKNOWN');
  });

  it('should set user to null on setUser action', () => {
    const state: UserState = { authorizationStatus: 'AUTH', user: mockUser };
    const action = setUser(null);
    const result = userReducer(state, action);
    
    expect(result.user).toBeNull();
    expect(result.authorizationStatus).toBe('AUTH');
  });

  it('should logout user and set authorization status to NO_AUTH on logout action', () => {
    const state: UserState = { authorizationStatus: 'AUTH', user: mockUser };
    const action = logout();
    const result = userReducer(state, action);
    
    expect(result.authorizationStatus).toBe('NO_AUTH');
    expect(result.user).toBeNull();
  });

  it('should handle logout when user is already logged out', () => {
    const state: UserState = { authorizationStatus: 'NO_AUTH', user: null };
    const action = logout();
    const result = userReducer(state, action);
    
    expect(result.authorizationStatus).toBe('NO_AUTH');
    expect(result.user).toBeNull();
  });
});

