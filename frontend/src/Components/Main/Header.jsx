import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actions as authActions } from '../../slices/authSlice';
import logoImg from '../../img/logo192-64.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(authActions.logout());
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <img className="h-100 " style={{ width: 120 }} src={logoImg} alt="Logo" />
        {/* <a className="navbar-brand" href="/">Hexlet Chat</a> */}
        {user && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogout}
        >
          выйти
        </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
