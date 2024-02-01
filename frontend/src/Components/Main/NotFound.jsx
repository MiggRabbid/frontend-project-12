import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate('/');

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {' '}
          <span className="text-danger">Упс!</span>
          {' '}
          Страница не найдена
        </p>
        <p className="lead">
          Но вы можете перейти на главную страницу
        </p>
        <br />
        <button
          type="submit"
          className="btn btn-group-vertical btn-outline-dark me-1"
          onClick={handleGoHome}
        >
          Вернуться
        </button>
      </div>
    </div>
  );
};

export default NotFound;
