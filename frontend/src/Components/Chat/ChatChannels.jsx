import React from 'react';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { actions as channelActions } from '../../slices/channelSlice';

const ChatChannels = () => {
  const dispatch = useDispatch();

  const currentChannels = useSelector((state) => state.channelReducer.currentChannels);
  const activeChannel = useSelector((state) => state.channelReducer.activeChannel);
  // console.log('------------------------ ChatChannels start');
  // console.log('ChatChannels currentChannels -', currentChannels);
  // console.log('ChatChannels activeChannel   -', activeChannel);

  const handelChangeChanel = (event) => {
    dispatch(channelActions.setActiveChanel(event.target.name));
    dispatch(channelActions.setActiveChannelId(event.target.id));
  };

  // console.log('------------------------ ChatChannels end');
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1  align-items-center justify-content-between mb-2 ps-4 pe-2 p-4">
        <strong>Каналы</strong>
        <button
          type="button"
          className="btn btn-outline-primary btn-group-vertical"
        >
          +
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
