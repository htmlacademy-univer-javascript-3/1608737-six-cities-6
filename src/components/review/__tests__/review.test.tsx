import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from '../review';
import { Review as ReviewType } from '../../../types/review';

describe('Review', () => {
  const mockReview: ReviewType = {
    id: '1',
    date: '2025-12-25T10:00:00.000Z',
    user: {
      name: 'Oliver.conner',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    comment: 'Great place to stay!',
    rating: 5,
  };

  it('should render review correctly', () => {
    render(<Review review={mockReview} />);
    
    expect(screen.getByText('Oliver.conner')).toBeInTheDocument();
    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();
  });

  it('should render user avatar', () => {
    render(<Review review={mockReview} />);
    
    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'avatar.jpg');
  });

  it('should render formatted date', () => {
    render(<Review review={mockReview} />);
    
    const timeElement = screen.getByText(/December 2025/);
    expect(timeElement).toBeInTheDocument();
  });

  it('should render rating correctly', () => {
    render(<Review review={mockReview} />);
    
    const ratingSpan = screen.getByText('Rating');
    expect(ratingSpan).toBeInTheDocument();
  });

  it('should render review with different rating', () => {
    const reviewWithRating3: ReviewType = {
      ...mockReview,
      rating: 3,
    };
    
    render(<Review review={reviewWithRating3} />);
    
    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();
  });
});

