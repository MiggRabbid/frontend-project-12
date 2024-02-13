import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { actions as modalActions } from '../../slices/modalSlice';

const AddModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changeableСhannelId = useSelector((state) => state.modalReducer.changeableСhannelId);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleRemoveButton = () => {
    const patchUrl = `/api/v1/channels/${changeableСhannelId}`;
    axios.delete(patchUrl, {
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
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.delete.body')}</p>
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
            variant="danger"
            onClick={handleRemoveButton}
          >
            {t('modals.delete.button')}
          </Button>
        </div>

      </Modal.Body>
    </>
  );
};

export default AddModal;
