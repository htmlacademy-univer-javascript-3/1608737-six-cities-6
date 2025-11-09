import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { offers } from './mocks/offers';

const OFFERS_COUNT = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App offersCount={OFFERS_COUNT} offers={offers} />
    </BrowserRouter>
  </React.StrictMode>
);
