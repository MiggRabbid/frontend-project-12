import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import Home from './Home';
import Login from './Authorization/Login';
import SignUp from './Authorization/SignUp';
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {modalState && (<ModalBox />)}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
};

export default App;
