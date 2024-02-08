import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Authorization/Login';
import NotFound from './NotFound';
import ModalBox from './Modals/ModalBox';

const App = () => {
  const modalState = useSelector((state) => state.modalReducer.show);

  useEffect(() => {
    document.querySelector('html').classList.add('h-100');
    document.querySelector('body').classList.add('h-100', 'bg-light');
    document.querySelector('#root').classList.add('h-100');
  }, []);

  return (
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
      {modalState && (<ModalBox />)}
    </Router>
  );
};

export default App;
