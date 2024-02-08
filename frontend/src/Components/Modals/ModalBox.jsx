import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { actions as modalActions } from '../../slices/modalSlice';

import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const ModalBox = () => {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.modalReducer.show);
  const modalType = useSelector((state) => state.modalReducer.modalType);

  const mappingModal = {
    addChannel: AddChannel,
    removeChannel: RemoveChannel,
    renameChannel: RenameChannel,
  };

  const CurrentModal = mappingModal[modalType];

  return (
    <Modal
      show={modalState}
      onHide={() => dispatch(modalActions.closedModal())}
      dialogClassName="modal-dialog-centered"
    >
      {CurrentModal && <CurrentModal />}
    </Modal>
  );
};

export default ModalBox;
