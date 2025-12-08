import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import { offers } from './mocks/offers';
import { store } from './store';
import { fillOffers } from './store/action';

store.dispatch(fillOffers(offers));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App offers={offers} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
