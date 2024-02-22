import { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import axios from 'axios';

import { getCurrentChannels, getActiveChannelId } from '../../selectors/chatSelectors';
import { getChangeableСhannelId, getChangeableСhannelName } from '../../selectors/modalSelectors';
import { actions as modalActions } from '../../slices/modalSlice';
import { actions as chatActions } from '../../slices/chatSlice';
import useAuth from '../../hooks/index';
import routes from '../../routes';

const getValidationSchema = (t, currentChannels) => yup.object({
  newChannelName: yup.string().trim()
    .min(3, t('validationError.wronglengthName'))
    .max(20, t('validationError.wronglengthName'))
    .required(t('validationError.requiredField'))
    .notOneOf(currentChannels, t('validationError.thisNameExists')),
});

const AddAndRenameChannel = ({ modalType }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();
  const { getAuthHeader } = useAuth();

  const currentChannelsNames = useSelector(getCurrentChannels)
    .map((channel) => channel.name);
  const activeChannelId = useSelector(getActiveChannelId);
  const changeableСhannelId = useSelector(getChangeableСhannelId);
  const changeableСhannelName = useSelector(getChangeableСhannelName);

  const formik = useFormik({
    initialValues: { newChannelName: changeableСhannelName },
    validationSchema: getValidationSchema(t, currentChannelsNames),
    onSubmit: async (values) => {
      const newChannelName = { name: leoProfanity.clean(values.newChannelName) };
      const headers = await getAuthHeader();
      const requestPath = (modalType === 'addChannel')
        ? routes.dataRequestPath('channels')
        : routes.dataRequestPathWithId('channels', changeableСhannelId);
      try {
        if (modalType === 'addChannel') {
          const response = await axios.post(requestPath, newChannelName, { headers });
          const { name, id } = response.data;
          dispatch(chatActions.setActiveChannel({ name, id }));
        }
        if (modalType === 'renameChannel') {
          const response = await axios.patch(requestPath, newChannelName, { headers });
          if (response.data.id === activeChannelId) {
            const { name, id } = response.data;
            dispatch(chatActions.setActiveChannel({ name, id }));
          }
        }
        dispatch(modalActions.closedModal());
        toast.success(t(`toasts.${modalType}.success`));
      } catch (error) {
        toast.error(t(`toasts.${modalType}.error`));
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (modalType === 'addChannel') inputRef.current.focus();
    if (modalType === 'renameChannel') inputRef.current.select();
  }, [inputRef, modalType]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.addAndRename.${modalType}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newChannelName}
              id="newChannelName"
              name="newChannelName"
              isInvalid={formik.touched.newChannelName && formik.errors.newChannelName}
              disabled={formik.isSubmitting}
            />
            <label className="visually-hidden" htmlFor="newChannelName">
              {t('modals.addAndRename.inputPlaceholder')}
            </label>
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
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddAndRenameChannel;
