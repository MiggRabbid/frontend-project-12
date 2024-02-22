import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { getModalState, getModalType } from '../../selectors/modalSelectors';
import { actions as modalActions } from '../../slices/modalSlice';
import AddAndRenameChannel from './AddAndRenameChannel';
import DeleteChannel from './DeleteChannel';

const mappingModal = {
  addChannel: AddAndRenameChannel,
  renameChannel: AddAndRenameChannel,
  deleteChannel: DeleteChannel,
};

const ModalBox = () => {
  const dispatch = useDispatch();

  const modalState = useSelector(getModalState);
  const modalType = useSelector(getModalType);
  const CurrentModal = mappingModal[modalType];

  return (
    <Modal
      show={modalState}
      onHide={() => dispatch(modalActions.closedModal())}
      dialogClassName="modal-dialog-centered"
    >
      {CurrentModal && <CurrentModal modalType={modalType} />}
    </Modal>
  );
};

export default ModalBox;
