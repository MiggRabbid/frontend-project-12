import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    activeChannel: 'general',
    currentChannels: null,
  },
  reducers: {
    setCurrentChannels: (state, action) => ({
      ...state,
      currentChannels: action.payload,

    }),
    getChannels: (state) => {
      const { currentChannels, activeChannel } = state;
      return { currentChannels, activeChannel };
    },
    delChannels: () => ({}),
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
