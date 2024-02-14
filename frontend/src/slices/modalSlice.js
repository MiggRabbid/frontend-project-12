import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    modalType: null,
    changeableСhannelId: null,
  },
  reducers: {
    openModal: (state, action) => ({
      ...state,
      show: action.payload.show,
      modalType: action.payload.modalType,
      changeableСhannelId: action.payload.id,
    }),
    closedModal: (state) => ({
      ...state,
      show: false,
      currentModal: null,
      changeableСhannel: null,
    }),
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
