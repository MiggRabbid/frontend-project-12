import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider as Rollbar, ErrorBoundary } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from '../hooks/index';
import routes from '../routes';
import Header from './Header';
import AuthProvider from './Authorization/AuthProvider';
import Login from './Authorization/Login';
import SignUp from './Authorization/SignUp';
import ChatPage from './Chat/ChatPage';
import NotFound from './NotFound';
import ModalBox from './Modals/ModalBox';

const PrivateOutlet = () => {
  const authentication = useAuth();
  return authentication.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const rollbarConfig = {
  accessToken: 'b0a4bbc496bc4484977e4caa87905c86',
  environment: process.env.NODE_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const App = () => {
  const modalState = useSelector((state) => state.modalReducer.show);
  useEffect(() => {
    document.querySelector('html').classList.add('h-100');
    document.querySelector('body').classList.add('h-100', 'bg-light');
    document.querySelector('#root').classList.add('h-100');
  }, []);

  return (
    <Rollbar config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <div className="h-100" id="chat">
              <div className="d-flex flex-column h-100 ">
                <Header />
                <Routes>
                  <Route path={routes.loginPagePath()} element={<Login />} />
                  <Route path={routes.signupPagePath()} element={<SignUp />} />
                  <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
                    <Route path="" element={<ChatPage />} />
                  </Route>
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
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </Rollbar>
  );
};

export default App;
