import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actions as chatActions } from '../../slices/chatSlice';
import axiosApi from '../../utils/axiosApi';
import ChannelsField from './ChannelsField';
import ChatField from './ChatField';

const ChatPage = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axiosApi({
      request: 'get',
      path: 'channels',
      token: user.token,
    }).then((response) => {
      dispatch(chatActions.setCurrentChannels(response.data));
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    axiosApi({
      request: 'get',
      path: 'messages',
      token: user.token,
    }).then((response) => {
      dispatch(chatActions.setCurrentChats(response.data));
    }).catch((error) => {
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
