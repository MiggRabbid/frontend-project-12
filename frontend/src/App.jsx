import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Main/Header';
import Home from './Components/Main/Home';
import Login from './Components/Authorization/Login';
import NotFound from './Components/Main/NotFound';

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
