import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--not-found">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="container">
          <section className="not-found" style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h1 className="not-found__title" style={{ fontSize: '48px', marginBottom: '20px' }}>404 Not Found</h1>
            <p className="not-found__text" style={{ fontSize: '18px', marginBottom: '40px' }}>
              The page you are looking for does not exist.
            </p>
            <Link
              className="not-found__link button"
              to="/"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                textDecoration: 'none',
                backgroundColor: '#4481c3',
                color: '#fff',
                borderRadius: '4px'
              }}
            >
              Go to main page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;

