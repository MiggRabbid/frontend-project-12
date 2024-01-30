import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ChatChannels from './ChatChannels';
import ChatField from './ChatField';

import { actions as channelActions } from '../../slices/channelSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const currentChannels = useSelector((state) => state.channelReducer.currentChannels);
  const activeChannel = useSelector((state) => state.channelReducer.activeChannel);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${token}`,
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
        <ChatChannels currentChannels={currentChannels} activeChannel={activeChannel} />
        <ChatField />
      </div>
    </div>
  );
};

export default Chat;
