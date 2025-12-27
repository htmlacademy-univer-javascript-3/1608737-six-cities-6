import React from 'react';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  onCardHover?: (id: string) => void;
  onCardLeave?: () => void;
  cardClassName?: string;
  listClassName?: string;
};

function OffersList({ offers, onCardHover, onCardLeave, cardClassName, listClassName }: OffersListProps): JSX.Element {
  const defaultListClassName = 'cities__places-list places__list tabs__content';
  const finalListClassName = listClassName || defaultListClassName;

  return (
    <div className={finalListClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onCardHover}
          onMouseLeave={onCardLeave}
          cardClassName={cardClassName}
        />
      ))}
    </div>
  );
}

export default React.memo(OffersList);

