export const getCurrentChannels = (state) => state.chatReducer.currentChannels;

export const getCurrentChannelsNames = (state) => (state.chatReducer.currentChannels
  .map((channel) => channel.name));

export const getActiveChannel = (state) => state.chatReducer.activeChannel;

export const getActiveChannelId = (state) => state.chatReducer.activeChannelId;

export const getActiveChat = (state) => state.chatReducer.activeChat;
