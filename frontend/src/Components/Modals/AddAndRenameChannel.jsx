import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { actions as modalActions } from '../../slices/modalSlice';
import { actions as chatActions } from '../../slices/chatSlice';

const getValidationSchema = (t, currentChannels) => yup.object({
  newChannelName: yup.string().trim()
    .min(3, t('validationError.wronglengthName'))
    .max(20, t('validationError.wronglengthName'))
    .required(t('validationError.requiredField'))
    .notOneOf(currentChannels, t('validationError.thisNameExists')),
});

const AddAndRenameChannel = ({ modalType }) => {
  console.log('AddAndRenameChannel - ', modalType);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();

  const currentChannels = useSelector((state) => state.chatReducer.currentChannels)
    .map((channel) => channel.name);
  const activeChannelId = useSelector((state) => state.chatReducer.activeChannelId);
  const changeableСhannelId = useSelector((state) => state.modalReducer.changeableСhannelId);
  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: { newChannelName: '' },
    validationSchema: getValidationSchema(t, currentChannels),
    onSubmit: (values) => {
      const newChannelName = { name: values.newChannelName };
      if (modalType === 'addChannel') {
        axios.post('/api/v1/channels', newChannelName, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then(() => {
            dispatch(modalActions.closedModal());
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (modalType === 'renameChannel') {
        const patchUrl = `/api/v1/channels/${changeableСhannelId}`;
        axios.patch(patchUrl, newChannelName, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => {
            console.log('activeChannelId - ', activeChannelId);
            console.log('response.data   - ', response.data.id);
            console.log('newChannelName  - ', newChannelName.name);
            if (response.data.id === activeChannelId) {
              dispatch(chatActions.setActiveChanel(newChannelName.name));
            }
            dispatch(modalActions.closedModal());
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.addAndRename.${modalType}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.newChannelName}
            type="text"
            id="newChannelName"
            name="newChannelName"
            placeholder={t('modals.addAndRename.inputPlaceholder')}
            isInvalid={formik.touched.newChannelName && formik.errors.newChannelName}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.newChannelName}
          </Form.Control.Feedback>
          <div className="mt-3 d-flex justify-content-end">
            <Button
              onClick={() => dispatch(modalActions.closedModal())}
              variant="secondary"
              className="me-2"
            >
              {t('modals.cancelButton')}
            </Button>
            {' '}
            <Button
              type="submit"
              variant="primary"
            >
              {t('modals.addAndRename.button')}
            </Button>
          </div>
        </Form>

      </Modal.Body>
    </>
  );
};

export default AddAndRenameChannel;
