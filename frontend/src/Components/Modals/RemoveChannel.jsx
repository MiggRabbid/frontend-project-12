import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';

import { actions as modalActions } from '../../slices/modalSlice';
import useAuth from '../../hooks/index';
import routes from '../../routes';

const AddModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAuthHeader } = useAuth();

  const changeableСhannelId = useSelector((state) => state.modalReducer.changeableСhannelId);

  const handleRemoveButton = () => {
    axios.delete(routes.dataRequestPath(`channels/${changeableСhannelId}`), { headers: getAuthHeader() })
      .then(() => {
        dispatch(modalActions.closedModal());
        toast.success(t('toasts.removeChannel.success'));
      })
      .catch((error) => {
        toast.error(t('toasts.removeChannel.error'));
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
