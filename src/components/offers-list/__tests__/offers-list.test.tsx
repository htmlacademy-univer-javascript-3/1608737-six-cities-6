import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OffersList from '../offers-list';
import { Offer } from '../../../types/offer';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('OffersList', () => {
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Offer 1',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: false,
      isPremium: false,
      rating: 4.5,
      description: 'Description 1',
      bedrooms: 2,
      maxAdults: 4,
      goods: ['Wi-Fi'],
      host: {
        name: 'Host 1',
        avatarUrl: 'avatar1.jpg',
        isPro: false,
      },
      images: ['image1.jpg'],
      previewImage: 'preview1.jpg',
    },
    {
      id: '2',
      title: 'Offer 2',
      type: 'room',
      price: 80,
      city: {
        name: 'Amsterdam',
        location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
      },
      location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
      isFavorite: true,
      isPremium: true,
      rating: 4.8,
      description: 'Description 2',
      bedrooms: 1,
      maxAdults: 2,
      goods: ['Wi-Fi', 'Kitchen'],
      host: {
        name: 'Host 2',
        avatarUrl: 'avatar2.jpg',
        isPro: true,
      },
      images: ['image2.jpg'],
      previewImage: 'preview2.jpg',
    },
  ];

  it('should render offers list', () => {
    renderWithRouter(<OffersList offers={mockOffers} />);
    
    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
  });

  it('should render empty offers list', () => {
    renderWithRouter(<OffersList offers={[]} />);
    
    const list = document.querySelector('.cities__places-list');
    expect(list).toBeInTheDocument();
  });

  it('should use custom list class name', () => {
    renderWithRouter(<OffersList offers={mockOffers} listClassName="custom-list" />);
    
    const list = document.querySelector('.custom-list');
    expect(list).toBeInTheDocument();
  });

  it('should use custom card class name', () => {
    renderWithRouter(<OffersList offers={mockOffers} cardClassName="favorites__card" />);
    
    const articles = screen.getAllByRole('article');
    articles.forEach(article => {
      expect(article).toHaveClass('favorites__card');
    });
  });
});

