import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/index';
import routes from '../routes';
import logoImg from '../img/logo120-40.png';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    navigate(routes.chatPagePath());
  };

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <div className="container">
        <Navbar.Brand href="/">
          <span className="visually-hidden">{t('header.logoText')}</span>
          <img src={logoImg} alt="Logo" />
        </Navbar.Brand>
        {user && (
        <Button
          type="submit"
          variant="primary"
          onClick={handleLogout}
        >
          {t('header.button')}
        </Button>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
