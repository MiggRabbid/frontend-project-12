import { useSelector } from 'react-redux';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getModalState } from '../selectors/modalSelectors.js';
import useAuth from '../hooks/index';
import routes from '../routes.js';
import Header from './Header.jsx';
import Login from './Authorization/Login.jsx';
import SignUp from './Authorization/SignUp.jsx';
import ChatPage from './Chat/ChatPage.jsx';
import NotFound from './NotFound.jsx';
import ModalBox from './Modals/ModalBox.jsx';

const PrivateOutlet = () => {
  const authentication = useAuth();
  return authentication.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => {
  const modalState = useSelector(getModalState);

  return (
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
            <Route path={routes.notFoundPagePath()} element={<NotFound />} />
          </Routes>
        </div>
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
      </div>
      {modalState && (<ModalBox />)}
    </BrowserRouter>
  );
};

export default App;
