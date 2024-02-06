import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import initApp from './init';
import reportWebVitals from './reportWebVitals';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await initApp();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
reportWebVitals();
