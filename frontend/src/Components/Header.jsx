import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actions as authActions } from '../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(authActions.logout());
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogout}
        >
          выйти
        </button>
      </div>
    </nav>
  );
};

export default Header;
