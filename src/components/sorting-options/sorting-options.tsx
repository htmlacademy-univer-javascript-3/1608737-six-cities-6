import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

export type SortOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type SortingOptionsProps = {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

const SORT_OPTIONS: SortOption[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSortClick = (sort: SortOption) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" ref={containerRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span>{currentSort}</span>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', {
        'places__options--opened': isOpen,
      })}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={classNames('places__option', {
              'places__option--active': option === currentSort,
            })}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSortClick(option);
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;

