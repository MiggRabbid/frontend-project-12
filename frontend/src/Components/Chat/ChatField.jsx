import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import axios from 'axios';

import { actions as chatActions } from '../../slices/chatSlice';
import useAuth from '../../hooks/index';
import routes from '../../routes';

const ChatField = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const messageRef = useRef();
  const { getAuthHeader } = useAuth();

  const user = JSON.parse(localStorage.getItem('user'));
  const activeChannelId = useSelector((state) => state.chatReducer.activeChannelId);
  const activeChat = useSelector((state) => state.chatReducer.activeChat);
  const activeChannel = useSelector((state) => state.chatReducer.activeChannel);

  const validationSchema = yup.object().shape({
    message: yup
      .string()
      .trim()
      .required(t('validationError.requiredField')),
  });

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema,
    onSubmit: (values, actions) => {
      console.log(values.message);
      const newMessage = {
        body: leoProfanity.clean(values.message),
        channelId: activeChannelId,
        username: user.username,
      };
      axios.post(routes.dataRequestPath('messages'), newMessage, { headers: getAuthHeader() })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          messageRef.current.focus();
          actions.resetForm({ values: { message: '' } });
        });
    },
  });

  useEffect(() => {
    messageRef.current.focus();
  }, [activeChannelId]);

  useEffect(() => {
    dispatch(chatActions.setActiveChat(activeChannelId));
  }, [activeChannelId]);

  const isValidInput = !formik.dirty || !formik.isValid;

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
        <div className="mt-auto px-5 py-3">
          <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup>
              <Form.Control
                ref={messageRef}
                autoFocus
                id="message"
                name="message"
                className="border-0 p-0 ps-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                aria-label={t('chatPage.chatField.messageInput.lable')}
                placeholder={t('chatPage.chatField.messageInput.placeholder')}
              />
              <Button
                type="submit"
                variant="group-vertical"
                className="border-0"
                disabled={isValidInput}
              >
                <ChevronRight size={20} />
                <span className="visually-hidden">{t('chatPage.chatField.sendButton')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatField;
