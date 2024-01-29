import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './slices/index';

import App from './Components/App';

const initApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  document.querySelector('html').classList.add('h-100');
  document.querySelector('body').classList.add('h-100', 'bg-light');
  document.querySelector('#root').classList.add('h-100');

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
};

initApp();
