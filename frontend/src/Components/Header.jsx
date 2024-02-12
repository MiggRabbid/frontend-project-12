import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actions as authActions } from '../slices/authSlice';
import logoImg from '../img/logo120-40.png';

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
    <Navbar expand="lg" className="shadow-sm bg-white">
      <div className="container">
        <Navbar.Brand href="/">
          <span className="visually-hidden">Hexlet Chat</span>
          <img src={logoImg} alt="Logo" />
        </Navbar.Brand>
        {user && (
        <Button
          type="submit"
          variant="primary"
          onClick={handleLogout}
        >
          выйти
        </Button>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
