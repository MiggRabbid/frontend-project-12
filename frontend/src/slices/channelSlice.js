import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    activeChannel: 'general',
    activeChannelId: null,
    currentChannels: null,
  },
  reducers: {
    setCurrentChannels: (state, action) => {
      const currentChannels = action.payload;
      const activeChannel = currentChannels.find((channel) => channel.name === state.activeChannel);
      return { ...state, activeChannelId: activeChannel.id, currentChannels };
    },
    setActiveChanel: (state, action) => ({
      ...state,
      activeChannel: action.payload,
    }),
    getChannels: (state) => {
      const { currentChannels, activeChannel, activeChannelId } = state;
      return { currentChannels, activeChannel, activeChannelId };
    },
    addChannel: () => ({}),
    delChannel: () => ({}),
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
