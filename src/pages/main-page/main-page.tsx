import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeCity, logout } from '../../store/action';
import {
  selectCity,
  selectIsOffersLoading,
  selectAuthorizationStatus,
  selectUser,
  selectSortedOffers,
  selectFilteredOffers,
} from '../../store/selectors';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortingOptions, { SortOption } from '../../components/sorting-options/sorting-options';
import Spinner from '../../components/spinner/spinner';

function MainPage(): JSX.Element {
  const dispatch = useDispatch();
  const currentCity = useSelector(selectCity);
  const isLoading = useSelector(selectIsOffersLoading);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>('Popular');
  
  const filteredOffers = useSelector((state) => selectFilteredOffers(state));
  const sortedOffers = useSelector((state) => selectSortedOffers(state, currentSort));
  
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  
  const handleCardHover = useCallback((id: string) => {
    setActiveOfferId(id);
  }, []);
  
  const handleCardLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);
  
  const handleCityChange = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);
  
  const cityCoordinates: Record<string, { latitude: number; longitude: number; zoom: number }> = useMemo(() => ({
    'Paris': { latitude: 48.85661, longitude: 2.35222, zoom: 13 },
    'Cologne': { latitude: 50.93753, longitude: 6.96028, zoom: 13 },
    'Brussels': { latitude: 50.85045, longitude: 4.34878, zoom: 13 },
    'Amsterdam': { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
    'Hamburg': { latitude: 53.55108, longitude: 9.99368, zoom: 13 },
    'Dusseldorf': { latitude: 51.22774, longitude: 6.77346, zoom: 13 },
  }), []);
  
  const city = useMemo(() => {
    return filteredOffers.length > 0 
      ? filteredOffers[0].city 
      : {
          name: currentCity,
          location: cityCoordinates[currentCity] || cityCoordinates['Paris'],
        };
  }, [filteredOffers, currentCity, cityCoordinates]);
  
  if (isLoading) {
    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link header__logo-link--active" to="/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="page__main page__main--index">
          <Spinner />
        </main>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
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


