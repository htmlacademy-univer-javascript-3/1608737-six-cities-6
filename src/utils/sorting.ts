import { Offer } from '../mocks/offers';
import { SortOption } from '../components/sorting-options/sorting-options';

export const sortOffers = (offers: Offer[], sortOption: SortOption): Offer[] => {
  const sortedOffers = [...offers];

  switch (sortOption) {
    case 'Popular':
      return sortedOffers;
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sortedOffers;
  }
};

