import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../Chat/ChatBox';

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  return <ChatBox />;
};

export default Home;
