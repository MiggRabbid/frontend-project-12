import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { actions as chatActions } from '../../slices/chatSlice';
import useAuth from '../../hooks/index';
import routes from '../../routes';

import ChannelsField from './ChannelsField';
import ChatField from './ChatField';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    axios.get(routes.dataRequestPath('messages'), { headers: getAuthHeader() }).then((response) => {
      dispatch(chatActions.setCurrentChats(response.data));
    })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get(routes.dataRequestPath('channels'), { headers: getAuthHeader() }).then((response) => {
      dispatch(chatActions.setCurrentChannels(response.data));
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
