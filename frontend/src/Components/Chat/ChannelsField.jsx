import React from 'react';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { actions as chatActions } from '../../slices/chatSlice';

const ChatChannels = () => {
  const dispatch = useDispatch();

  const currentChannels = useSelector((state) => state.chatReducer.currentChannels);
  const activeChannel = useSelector((state) => state.chatReducer.activeChannel);

  const handelChangeChanel = (event) => {
    dispatch(chatActions.setActiveChanel(event.target.name));
    dispatch(chatActions.setActiveChannelId(event.target.id));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1  align-items-center justify-content-between mb-2 ps-4 pe-2 p-4">
        <strong>Каналы</strong>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical btn-outline-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">Добавить канал</span>
        </button>
      </div>
      { currentChannels === null
        ? null
        : (
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {currentChannels.map((channel) => {
              const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
                'btn-secondary': channel.name === activeChannel,
              });
              return (
                <li
                  className="nav-item w-100"
                  key={channel.id}
                  data-removable={channel.removable}
                >
                  <button
                    type="button"
                    className={btnClass}
                    id={channel.id}
                    name={channel.name}
                    onClick={handelChangeChanel}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
};

export default ChatChannels;