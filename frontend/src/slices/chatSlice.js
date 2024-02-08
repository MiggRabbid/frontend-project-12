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
      const updatedCurrentChats = [...state.currentChats, action.payload];
      if (state.activeChannelId === newMessage.channelId) {
        const updatedActiveChat = [...state.activeChat, newMessage];
        return { ...state, currentChats: updatedCurrentChats, activeChat: updatedActiveChat };
      }
      return { ...state, currentChats: updatedCurrentChats };
    },
    updateCurrentChannels: (state, action) => {
      const updatedChannels = [...state.currentChannels, action.payload];
      return { ...state, currentChannels: updatedChannels };
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
    removeChannel: (state, actions) => {
      const { currentChannels, activeChannelId } = state;
      const deletedId = actions.payload.id;
      const updatedChannels = currentChannels.filter((channels) => channels.id !== deletedId);

      if (deletedId === activeChannelId) {
        return {
          ...state,
          currentChannels: updatedChannels,
          activeChannel: 'general',
        };
      }

      return {
        ...state,
        currentChannels: updatedChannels,
      };
    },
    renameChannel: (state, actions) => {
      const { currentChannels } = state;
      const renameChannel = actions.payload;
      const updatedChannels = currentChannels.map((channel) => {
        if (channel.id !== renameChannel.id) {
          return channel;
        }
        return renameChannel;
      });
      return {
        ...state,
        currentChannels: updatedChannels,
      };
    },
  },
});

export const { actions } = chatSlice;

export default chatSlice.reducer;
