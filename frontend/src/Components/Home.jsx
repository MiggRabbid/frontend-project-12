import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  console.log('-------------- Home');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
    if (token) {
      navigate('/chat');
    }
  });

  return (
    <div className="d-flex justify-content-center" />
  );
};

export default Home;
