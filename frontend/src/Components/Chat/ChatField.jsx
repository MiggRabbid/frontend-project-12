import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import { actions as chatActions } from '../../slices/chatSlice';

const ChatField = () => {
  console.log('------------------------ ChatField start');
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const activeChannel = useSelector((state) => state.channelReducer.activeChannel);
  const activeChannelId = useSelector((state) => state.channelReducer.activeChannelId);
  const activeChat = useSelector((state) => state.chatReducer.activeChat);

  console.log('ChatField activeChannel   -', activeChannel);
  console.log('ChatField activeChannelId -', activeChannelId);
  console.log('ChatField activeChat      -', activeChat);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('ChatField useEffect  try');
        const response = await axios.get('/api/v1/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('ChatField response -', response.data);
        dispatch(chatActions.setCurrentChats(response.data));
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('ChatField useEffect -');
    console.log('ChatField activeChannelId -', activeChannelId);
    dispatch(chatActions.setActiveChat(activeChannelId));
  }, [activeChannelId]);

  console.log('------------------------ ChatField end');
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <strong>
              {'# '}
              {activeChat.length}
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
          <Formik
            initialValues={{ message: '' }}
            onSubmit={(values, actions) => {
              console.log('Отправка сообщения:', values.message);
              actions.resetForm({ values: { message: '' } });
            }}
          >
            {({ values }) => (
              <Form className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <Field
                    type="text"
                    id="message"
                    name="message"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 me-1 form-control"
                  />
                  <button
                    type="submit"
                    className="btn btn-group-vertical btn-outline-dark me-1"
                    disabled={values.message.trim() === ''}
                  >
                    {'>'}
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChatField;
