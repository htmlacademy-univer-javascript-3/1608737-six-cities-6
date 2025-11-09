import { Offer } from '../../mocks/offers';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  onCardHover?: (id: string) => void;
  onCardLeave?: () => void;
  cardClassName?: string;
};

function OffersList({ offers, onCardHover, onCardLeave, cardClassName }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
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

export default OffersList;

