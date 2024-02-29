import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import MessageForm from './MessageForm';
import { getActiveChannel, getActiveChat } from '../../selectors/chatSelectors';

const ChatField = () => {
  const { t } = useTranslation();

  const activeChannel = useSelector(getActiveChannel);
  const activeChat = useSelector(getActiveChat);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <strong>
              {t('chatPage.chatField.prefix')}
              {activeChannel}
            </strong>
          </p>
          <span className="text-muted">
            {t('chatPage.chatField.messageCount.counter.count', { count: activeChat.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {activeChat.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <strong>{message.username}</strong>
              {':  '}
              {message.body}
            </div>
          ))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatField;
