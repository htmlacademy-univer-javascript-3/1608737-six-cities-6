import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/action';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortingOptions, { SortOption } from '../../components/sorting-options/sorting-options';
import { sortOffers } from '../../utils/sorting';

function MainPage(): JSX.Element {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>('Popular');
  
  const filteredOffers = allOffers.filter((offer) => offer.city.name === currentCity);
  const sortedOffers = sortOffers(filteredOffers, currentSort);

  const handleCardHover = (id: string) => {
    setActiveOfferId(id);
  };

  const handleCardLeave = () => {
    setActiveOfferId(null);
  };

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  const cityCoordinates: Record<string, { latitude: number; longitude: number; zoom: number }> = {
    'Paris': { latitude: 48.85661, longitude: 2.35222, zoom: 13 },
    'Cologne': { latitude: 50.93753, longitude: 6.96028, zoom: 13 },
    'Brussels': { latitude: 50.85045, longitude: 4.34878, zoom: 13 },
    'Amsterdam': { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
    'Hamburg': { latitude: 53.55108, longitude: 9.99368, zoom: 13 },
    'Dusseldorf': { latitude: 51.22774, longitude: 6.77346, zoom: 13 },
  };

  const city = filteredOffers.length > 0 
    ? filteredOffers[0].city 
    : {
        name: currentCity,
        location: cityCoordinates[currentCity] || cityCoordinates['Paris'],
      };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={currentCity} onCityChange={handleCityChange} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {currentCity}</b>
              <SortingOptions currentSort={currentSort} onSortChange={setCurrentSort} />
              <OffersList
                offers={sortedOffers}
                onCardHover={handleCardHover}
                onCardLeave={handleCardLeave}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={sortedOffers} city={city} activeOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;


