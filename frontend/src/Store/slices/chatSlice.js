import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeChat: [],
    allChats: [],
  },
  reducers: {
    setCurrentChats: (state, action) => ({
      ...state,
      currentChats: action.payload,
    }),
    setActiveChat: (state, action) => {
      const { allChats } = state;
      const activeChannelId = action.payload;
      if (activeChannelId === null || activeChannelId === undefined) {
        return { ...state };
      }
      const activeChat = allChats.filter((chat) => chat.channelId === activeChannelId);
      return { ...state, activeChat };
    },
    updateCurrentChats: (state, action) => {
      const newMessage = action.payload;
      return { ...state, allChats: [...state.allChats, newMessage] };
    },
  },
});

export const { actions } = chatSlice;

export default chatSlice.reducer;
