import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    modalType: null,
    changeableСhannelId: null,
    changeableСhannelName: null,
  },
  reducers: {
    openModal: (state, action) => ({
      ...state,
      show: action.payload.show,
      modalType: action.payload.modalType,
      changeableСhannelId: action.payload.id,
      changeableСhannelName: action.payload.name,
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
