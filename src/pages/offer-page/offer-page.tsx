import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchOfferById, logout } from '../../store/action';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Spinner from '../../components/spinner/spinner';

function OfferPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const currentOffer = useSelector((state: RootState) => state.currentOffer);
  const isCurrentOfferLoading = useSelector((state: RootState) => state.isCurrentOfferLoading);
  const offerNotFound = useSelector((state: RootState) => state.offerNotFound);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const user = useSelector((state: RootState) => state.user);
  const nearbyOffers = useSelector((state: RootState) => state.nearbyOffers);
  const reviews = useSelector((state: RootState) => state.reviews);
  const { id } = useParams<{ id: string }>();
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
    }
    
    return () => {
      // Cleanup: reset state when component unmounts or id changes
    };
  }, [id, dispatch]);
  
  if (isCurrentOfferLoading) {
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {authorizationStatus === 'AUTH' && user ? (
                    <>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                            <img src={user.avatarUrl} alt={user.name} style={{ borderRadius: '50%' }} />
                          </div>
                          <span className="header__user-name user__name">{user.email}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to="/" onClick={handleLogout}>
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/login">
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--offer">
          <Spinner />
        </main>
      </div>
    );
  }
  
  if (!isCurrentOfferLoading && offerNotFound) {
    return <Navigate to="/404" replace />;
  }

  if (!currentOffer) {
    return null;
  }

  const offer = currentOffer;

  const ratingPercent = Math.round((offer.rating || 0) * 20);
  const descriptionParagraphs = (offer.description || '').split('. ').filter((p) => p.length > 0);
  const images = offer.images && offer.images.length > 0 ? offer.images : (offer.previewImage ? [offer.previewImage] : []);
  const goods = offer.goods || [];
  const host = offer.host || { name: '', avatarUrl: '', isPro: false };
  
  const mapOffers = [offer, ...nearbyOffers];

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === 'AUTH' && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={user.avatarUrl} alt={user.name} style={{ borderRadius: '50%' }} />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/login">
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${ratingPercent}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedroom{offer.bedrooms !== 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults !== 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  {descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                <ReviewForm offerId={offer.id} />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map offers={mapOffers} city={offer.city} activeOfferId={offer.id} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} cardClassName="near-places__card" listClassName="near-places__list places__list" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

