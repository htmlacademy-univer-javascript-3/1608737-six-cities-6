import classNames from 'classnames';

type CitiesListProps = {
  currentCity: string;
  onCityChange: (city: string) => void;
};

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

function CitiesList({ currentCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={classNames('locations__item-link', 'tabs__item', {
                  'tabs__item--active': city === currentCity,
                })}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;

