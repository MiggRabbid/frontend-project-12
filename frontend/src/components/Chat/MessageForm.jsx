import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import axios from 'axios';

import { getActiveChannelId } from '../../selectors/chatSelectors';
import useAuth from '../../hooks/index';
import routes from '../../routes';

const getValidationSchema = (t) => yup.object().shape({
  message: yup
    .string()
    .trim()
    .required(t('validationError.requiredField')),
});

const MessageForm = () => {
  const { t } = useTranslation();
  const messageRef = useRef();
  const { user, getAuthHeader } = useAuth();

  const activeChannelId = useSelector(getActiveChannelId);

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: getValidationSchema(t),
    onSubmit: async (values, actions) => {
      const newMessage = {
        body: leoProfanity.clean(values.message),
        channelId: activeChannelId,
        username: user.username,
      };
      const headers = await getAuthHeader();
      try {
        await axios.post(routes.dataRequestPath('messages'), newMessage, { headers });
      } catch (error) {
        console.error(error);
      }
      actions.resetForm({ values: { message: '' } });
      messageRef.current.focus();
    },
  });
  useEffect(() => {
    setTimeout(() => messageRef.current.focus());
  }, [messageRef]);

  const isValidInput = !formik.dirty || !formik.isValid;

  return (
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
  );
};

export default MessageForm;
