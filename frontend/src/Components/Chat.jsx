import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actions as authActions } from '../slices/authSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(authActions.logout(null));
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="mt-3">
        <h1>Чат (slack)</h1>
        <p>добро пожаловать</p>
        <br />
        <p className="text-success">Вы успешно авторизовались</p>
        <button
          type="button"
          className="w-100 mt-5 mb-3 btn btn-outline-primary"
          onClick={handleLogout}
        >
          выйти
        </button>
      </div>
    </div>
  );
};

export default Chat;
