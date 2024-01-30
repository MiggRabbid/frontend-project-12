import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeChat: [],
    currentChats: [],
  },
  reducers: {
    setCurrentChats: (state, action) => ({
      ...state,
      currentChats: action.payload,
    }),
    setActiveChat: (state, action) => {
      console.log('------------------------ setActiveChat start');
      console.log('payload        -', action.payload);
      console.log('currentChats   -', state.currentChats);
      const { currentChats } = state;
      const activeChannelId = action.payload;
      if (activeChannelId === null || activeChannelId === undefined) {
        console.log('------------------------ setActiveChat end []');
        return { ...state };
      }
      const activeChat = currentChats.filter((chat) => chat.channelId === activeChannelId);
      console.log('activeChat     -', state.currentChats);
      console.log('------------------------ setActiveChat end [...]');
      return { ...state, activeChat };
    },
  },
});

export const { actions } = chatSlice;

export default chatSlice.reducer;
