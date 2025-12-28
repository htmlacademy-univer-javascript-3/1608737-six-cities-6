import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OfferCard from '../offer-card';
import { Offer } from '../../../types/offer';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('OfferCard', () => {
  const mockOffer: Offer = {
    id: '1',
    title: 'Beautiful Apartment',
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
    description: 'A beautiful apartment in the heart of Paris',
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Kitchen'],
    host: {
      name: 'Oliver.conner',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    images: ['image1.jpg'],
    previewImage: 'preview.jpg',
  };

  it('should render offer card correctly', () => {
    renderWithRouter(<OfferCard offer={mockOffer} />);
    
    expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });

  it('should render price correctly', () => {
    renderWithRouter(<OfferCard offer={mockOffer} />);
    
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
  });

  it('should render premium mark when offer is premium', () => {
    const premiumOffer: Offer = { ...mockOffer, isPremium: true };
    renderWithRouter(<OfferCard offer={premiumOffer} />);
    
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium mark when offer is not premium', () => {
    renderWithRouter(<OfferCard offer={mockOffer} />);
    
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render favorite button', () => {
    renderWithRouter(<OfferCard offer={mockOffer} />);
    
    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toBeInTheDocument();
  });

  it('should render preview image', () => {
    renderWithRouter(<OfferCard offer={mockOffer} />);
    
    const image = screen.getByAltText('Place image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'preview.jpg');
  });

  it('should render link to offer page', () => {
    renderWithRouter(<OfferCard offer={mockOffer} />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/offer/1');
  });

  it('should use custom card class name', () => {
    renderWithRouter(<OfferCard offer={mockOffer} cardClassName="favorites__card" />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('favorites__card');
  });
});

