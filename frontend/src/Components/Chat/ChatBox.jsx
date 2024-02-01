import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ChatChannels from './ChatChannels';
import ChatField from './ChatField';

import { actions as channelActions } from '../../Store/slices/channelSlice';

const ChatBox = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch(channelActions.setCurrentChannels(response.data));
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChatChannels />
        <ChatField />
      </div>
    </div>
  );
};

export default ChatBox;
