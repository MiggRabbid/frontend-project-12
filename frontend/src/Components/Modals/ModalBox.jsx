import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { actions as modalActions } from '../../slices/modalSlice';
import AddAndRenameChannel from './AddAndRenameChannel';
import RemoveChannel from './RemoveChannel';

const mappingModal = {
  addChannel: AddAndRenameChannel,
  renameChannel: AddAndRenameChannel,
  removeChannel: RemoveChannel,
};

const ModalBox = () => {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.modalReducer.show);
  const modalType = useSelector((state) => state.modalReducer.modalType);

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
