import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';

import { getChangeableСhannelId } from '../../selectors/modalSelectors';
import { actions as modalActions } from '../../slices/modalSlice';
import useAuth from '../../hooks/index';
import routes from '../../routes';

const AddModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAuthHeader } = useAuth();

  const changeableСhannelId = useSelector(getChangeableСhannelId);

  const handleRemoveButton = async () => {
    const requestPath = routes.dataRequestPathWithId('channels', changeableСhannelId);
    const headers = await getAuthHeader();
    try {
      await axios.delete(requestPath, { headers });
      dispatch(modalActions.closedModal());
      toast.success(t('toasts.deleteChannel.success'));
    } catch (error) {
      toast.error(t('toasts.deleteChannel.error'));
      console.error(error);
    }
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
