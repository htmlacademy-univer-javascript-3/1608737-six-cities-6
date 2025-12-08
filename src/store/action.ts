import { Offer } from '../mocks/offers';

export const changeCity = (city: string) => ({
  type: 'city/change' as const,
  payload: city,
});

export const fillOffers = (offers: Offer[]) => ({
  type: 'offers/fill' as const,
  payload: offers,
});

