import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer } from '../types/offer';
import { sortOffers } from '../utils/sorting';
import { SortOption } from '../components/sorting-options/sorting-options';

export const selectCity = (state: RootState) => state.city.city;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectIsOffersLoading = (state: RootState) => state.offers.isLoading;
export const selectCurrentOffer = (state: RootState) => state.offer.currentOffer;
export const selectIsCurrentOfferLoading = (state: RootState) => state.offer.isCurrentOfferLoading;
export const selectOfferNotFound = (state: RootState) => state.offer.offerNotFound;
export const selectNearbyOffers = (state: RootState) => state.offer.nearbyOffers;
export const selectReviews = (state: RootState) => state.offer.reviews;
export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectUser = (state: RootState) => state.user.user;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectSortedOffers = createSelector(
  [selectFilteredOffers, (state: RootState, sortOption: SortOption) => sortOption],
  (filteredOffers, sortOption) => sortOffers(filteredOffers, sortOption)
);

