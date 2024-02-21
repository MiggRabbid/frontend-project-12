import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import initApp from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await initApp();
  root.render(
    <StrictMode>
      {vdom}
    </StrictMode>,
  );
};

app();
