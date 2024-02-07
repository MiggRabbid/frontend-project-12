import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';

import { actions as chatActions } from '../../slices/chatSlice';

const ChatField = () => {
  const dispatch = useDispatch();
  const messageRef = useRef();

  const user = JSON.parse(localStorage.getItem('user'));
  const activeChannelId = useSelector((state) => state.chatReducer.activeChannelId);
  const activeChat = useSelector((state) => state.chatReducer.activeChat);
  const activeChannel = useSelector((state) => state.chatReducer.activeChannel);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values, actions) => {
      const newMessage = {
        body: values.message,
        channelId: activeChannelId,
        username: user.username,
      };
      axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
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

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <strong>
              {'# '}
              {activeChannel}
            </strong>
          </p>
          <span className="text-muted">
            { activeChat.length }
            {' '}
            сообщения
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                id="message"
                name="message"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2"
              />
              <Button
                type="submit"
                variant="light"
                disabled={formik.values.message.trim() === ''}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatField;
