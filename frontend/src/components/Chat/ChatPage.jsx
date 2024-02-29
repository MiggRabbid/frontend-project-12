import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';

import { actions as chatActions } from '../../slices/chatSlice';
import useAuth from '../../hooks/index';
import routes from '../../routes';

import ChannelsField from './ChannelsField';
import ChatField from './ChatField';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAuthHeader, logOut } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const axiosRequest = async () => {
      const headers = await getAuthHeader();
      try {
        const messages = await axios.get(routes.dataRequestPath('messages'), { headers });
        const channels = await axios.get(routes.dataRequestPath('channels'), { headers });
        dispatch(chatActions.setCurrentChats(messages.data));
        dispatch(chatActions.setCurrentChannels(channels.data));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('toasts.auth.unknownErr'));
        } else if (error.response.status === 401) {
          logOut();
          navigate(routes.loginPagePath());
        } else {
          toast.error(t('toasts.auth.networkErr'));
        }
      }
    };
    axiosRequest();
  }, [dispatch, getAuthHeader]);

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
