import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { actions as modalActions } from '../../slices/modalSlice';

const AddModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const changeableСhannelId = useSelector((state) => state.modalReducer.changeableСhannelId);

  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: { newChannelName: '' },
    onSubmit: (values) => {
      const newNameChannel = { name: values.newChannelName };
      const patchUrl = `/api/v1/channels/${changeableСhannelId}`;
      axios.patch(patchUrl, newNameChannel, {
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
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
            placeholder="Введите название канала (от 3 до 20 символов)"
          />
          <div className="mt-3 d-flex justify-content-end">
            <Button
              onClick={() => dispatch(modalActions.closedModal())}
              variant="secondary"
            >
              Отменить
            </Button>
            {' '}
            <Button
              type="submit"
              variant="primary"
              disabled={formik.values.newChannelName.trim() === ''}
            >
              Отправить
            </Button>
          </div>
        </Form>

      </Modal.Body>
    </>
  );
};

export default AddModal;
