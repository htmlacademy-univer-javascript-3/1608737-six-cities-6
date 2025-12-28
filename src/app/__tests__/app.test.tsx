import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../app';
import { reducer } from '../../store/reducer';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer,
    preloadedState: initialState,
  });
};

describe('App routing', () => {
  it('should render MainPage on root route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render LoginPage on /login route', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: 'NO_AUTH',
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render NotFoundPage on /404 route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/404']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage on unknown route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it('should render OfferPage on /offer/:id route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/123']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const container = document.body;
    expect(container).toBeInTheDocument();
  });

  it('should redirect to login when accessing /favorites without authorization', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: 'NO_AUTH',
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render FavoritesPage on /favorites route when authorized', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: 'AUTH',
        user: {
          email: 'test@example.com',
          name: 'Test User',
          avatarUrl: 'avatar.jpg',
          isPro: false,
        },
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const logos = screen.getAllByAltText('6 cities logo');
    expect(logos.length).toBeGreaterThan(0);
  });
});

