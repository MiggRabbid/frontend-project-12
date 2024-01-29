import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1>Чат (slack)</h1>
        <p>добро пожаловать</p>
        <br />
        <p className="text-primary">Вам нужно авторизоваться</p>
      </div>

    </div>
  );
};

export default Home;
