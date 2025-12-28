import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewsList from '../reviews-list';
import { Review } from '../../../types/review';

describe('ReviewsList', () => {
  const mockReviews: Review[] = [
    {
      id: '1',
      date: '2025-12-25T10:00:00.000Z',
      user: {
        name: 'Oliver.conner',
        avatarUrl: 'avatar1.jpg',
        isPro: false,
      },
      comment: 'Great place!',
      rating: 5,
    },
    {
      id: '2',
      date: '2025-12-25T10:00:00.000Z',
      user: {
        name: 'Jane Smith',
        avatarUrl: 'avatar2.jpg',
        isPro: true,
      },
      comment: 'Nice apartment',
      rating: 4,
    },
  ];

  it('should render reviews list with title', () => {
    render(<ReviewsList reviews={mockReviews} />);
    
    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render all reviews', () => {
    render(<ReviewsList reviews={mockReviews} />);
    
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Nice apartment')).toBeInTheDocument();
    expect(screen.getByText('Oliver.conner')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render empty reviews list', () => {
    render(<ReviewsList reviews={[]} />);
    
    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should display correct reviews count', () => {
    const singleReview = [mockReviews[0]];
    render(<ReviewsList reviews={singleReview} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

