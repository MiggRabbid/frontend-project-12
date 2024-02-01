import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChannels: null,
    activeChannel: 'general',
    activeChannelId: null,
    currentChats: [],
    activeChat: [],
  },
  reducers: {
    setCurrentChannels: (state, action) => {
      const { currentChats } = state;
      const currentChannels = action.payload;
      const activeChannel = currentChannels.find((channel) => channel.name === state.activeChannel);
      const activeChannelId = activeChannel.id;
      const activeChat = currentChats.filter((chat) => chat.channelId === activeChannelId);

      return {
        ...state, activeChannelId, currentChannels, activeChat,
      };
    },
    setActiveChanel: (state, action) => ({
      ...state,
      activeChannel: action.payload,
    }),
    setActiveChannelId: (state, action) => ({
      ...state,
      activeChannelId: action.payload,
    }),
    setCurrentChats: (state, action) => ({
      ...state,
      currentChats: action.payload,
    }),
    updateCurrentChats: (state, action) => {
      const newMessage = action.payload;
      const updatedCurrentChats = [...state.currentChats, newMessage];
      if (state.activeChannelId === newMessage.channelId) {
        const updatedActiveChat = [...state.activeChat, newMessage];
        return { ...state, currentChats: updatedCurrentChats, activeChat: updatedActiveChat };
      }
      return { ...state, currentChats: updatedCurrentChats };
    },
    setActiveChat: (state, action) => {
      const { currentChats } = state;
      const activeChannelId = action.payload;
      if (activeChannelId === null || activeChannelId === undefined) {
        return { ...state };
      }
      const activeChat = currentChats.filter((chat) => chat.channelId === activeChannelId);
      return { ...state, activeChat };
    },
  },
});

export const { actions } = chatSlice;

export default chatSlice.reducer;
