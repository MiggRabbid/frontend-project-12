import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Main/Header';
import Home from './Main/Home';
import Login from './Authorization/Login';
import NotFound from './Main/NotFound';

const App = () => (
  <Router>
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100 ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
