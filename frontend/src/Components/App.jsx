import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Chat from './Chat/Chat';
import NotFound from './NotFound';

const App = () => (
  <Router>
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100 ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
