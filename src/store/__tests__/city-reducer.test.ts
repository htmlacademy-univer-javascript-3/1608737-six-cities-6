import { describe, it, expect } from 'vitest';
import { cityReducer } from '../city-reducer';
import { changeCity } from '../action';
import { CityState } from '../city-reducer';

describe('cityReducer', () => {
  const initialState: CityState = {
    city: 'Paris',
  };

  it('should return the initial state when passed an empty action', () => {
    const result = cityReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should return the initial state when passed an unknown action', () => {
    const result = cityReducer(initialState, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should change city on changeCity action', () => {
    const action = changeCity('Amsterdam');
    const result = cityReducer(initialState, action);
    
    expect(result.city).toBe('Amsterdam');
    expect(result).toEqual({ city: 'Amsterdam' });
  });

  it('should update city when current city is different', () => {
    const state: CityState = { city: 'Paris' };
    const action = changeCity('Cologne');
    const result = cityReducer(state, action);
    
    expect(result.city).toBe('Cologne');
    expect(result).toEqual({ city: 'Cologne' });
  });
});

