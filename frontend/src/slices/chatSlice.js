import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChannels: null,
    currentChats: [],
    activeChannel: 'general',
    activeChannelId: null,
    activeChat: [],
  },
  reducers: {
    setCurrentChannels: (state, action) => {
      const { currentChats, activeChannel } = state;
      const currentChannels = action.payload;
      const activeChannelId = currentChannels
        .find((channel) => (channel.name === activeChannel)).id;
      const activeChat = currentChats.filter((chat) => chat.channelId === activeChannelId);
      return {
        ...state, activeChannelId, currentChannels, activeChat,
      };
    },
    setCurrentChats: (state, action) => ({
      ...state,
      currentChats: action.payload,
    }),
    setActiveChannel: (state, action) => {
      const { currentChats } = state;
      const { name, id } = action.payload;
      const activeChat = currentChats.filter((chat) => chat.channelId === id);
      return {
        ...state, activeChannel: name, activeChannelId: id, activeChat,
      };
    },
    updateCurrentChats: (state, action) => {
      const newMessage = action.payload;
      const updatedCurrentChats = [...state.currentChats, newMessage];
      return (state.activeChannelId !== newMessage.channelId)
        ? ({
          ...state,
          currentChats: updatedCurrentChats,
        })
        : ({
          ...state,
          currentChats: updatedCurrentChats,
          activeChat: [...state.activeChat, newMessage],
        });
    },
    updateCurrentChannels: (state, action) => ({
      ...state,
      currentChannels: [...state.currentChannels, action.payload],
    }),
    deleteChannel: (state, action) => {
      const { currentChannels, activeChannelId } = state;
      const deletedId = action.payload.id;
      const updatedChannels = currentChannels.filter((channels) => channels.id !== deletedId);
      return (deletedId === activeChannelId)
        ? ({
          ...state,
          currentChannels: updatedChannels,
          activeChannel: 'general',
        })
        : ({
          ...state,
          currentChannels: updatedChannels,
        });
    },
    renameChannel: (state, action) => {
      const { currentChannels, activeChannelId } = state;
      const renameChannel = action.payload;
      const updatedChannels = currentChannels.map((channel) => ((channel.id !== renameChannel.id)
        ? channel
        : renameChannel));
      return (activeChannelId !== renameChannel.id)
        ? ({ ...state, currentChannels: updatedChannels })
        : ({ ...state, currentChannels: updatedChannels, activeChannel: renameChannel.name });
    },
  },
});

export const { actions } = chatSlice;

export default chatSlice.reducer;
