import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPage from './Chat/ChatPage';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  return user && <ChatPage />;
};

export default Home;
