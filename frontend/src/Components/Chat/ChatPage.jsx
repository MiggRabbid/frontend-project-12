import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ChannelsField from './ChannelsField';
import ChatField from './ChatField';

import { actions as chatActions } from '../../slices/chatSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        dispatch(chatActions.setCurrentChannels(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        dispatch(chatActions.setCurrentChats(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsField />
        <ChatField />
      </div>
    </div>
  );
};

export default ChatPage;
