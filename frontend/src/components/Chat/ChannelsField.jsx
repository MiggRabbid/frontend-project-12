import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getCurrentChannels, getActiveChannel } from '../../selectors/chatSelectors';
import { actions as chatActions } from '../../slices/chatSlice';
import { actions as modalActions } from '../../slices/modalSlice';

const ChannelsField = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentChannels = useSelector(getCurrentChannels);
  const activeChannel = useSelector(getActiveChannel);

  const handelSwitchChanel = (event) => {
    dispatch(chatActions.setActiveChannel({
      name: event.target.name,
      id: event.target.id,
    }));
  };

  /*
    Т.к. модальные окна для добавления и переименования канала обеденены в 1н элемент,
  то тут пришлось использовать 2е функции: для кнопки добавления, и отдельно для
  переименования и удаленяи канала. Можно использовать одну функцию обработчик,
  но тогда в ней придется использовать тернарные операторы.
  Возможно это пепеусложнение, и нужно было сделать отдельные элементы, но
  т.к. они максимально похожи, то я решил объеденить их.
  */
  const handelAddChannel = (event) => {
    dispatch(modalActions.openModal({
      modalType: event.target.dataset.change,
      show: true,
    }));
  };

  const handelChangeChannel = (event) => {
    const changeableСhannel = currentChannels.find((channel) => channel.id === event.target.id);
    dispatch(modalActions.openModal({
      id: event.target.id,
      modalType: event.target.dataset.change,
      show: true,
      name: changeableСhannel.name,
    }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 align-items-center justify-content-between mb-2 ps-4 pe-2 p-4">
        <strong>{t('chatPage.channels.title')}</strong>
        <Button
          onClick={handelAddChannel}
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          id="addChannel"
          data-change="addChannel"
        >
          <PlusSquare id="addChannel" data-change="addChannel" size={20} />
          <span className="visually-hidden" id="addChannel" data-change="addChannel">{t('chatPage.channels.addButton')}</span>
        </Button>
      </div>
      { currentChannels === null
        ? null
        : (
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {currentChannels.map((channel) => {
              const variant = channel.name === activeChannel ? 'secondary' : null;
              return (
                <li
                  className="nav-item w-100"
                  key={channel.id}
                >
                  {!channel.removable && (
                    <Button
                      type="button"
                      className="w-100 rounded-0 text-start"
                      variant={variant}
                      id={channel.id}
                      name={channel.name}
                      onClick={handelSwitchChanel}
                    >
                      <span className="me-1">{t('chatPage.channels.prefix')}</span>
                      {channel.name}
                    </Button>
                  )}
                  {channel.removable && (
                    <Dropdown as={ButtonGroup} className="d-flex">
                      <Button
                        type="button"
                        className="w-100 rounded-0 text-start text-truncate"
                        variant={variant}
                        id={channel.id}
                        name={channel.name}
                        onClick={handelSwitchChanel}
                      >
                        <span className="me-1">{t('chatPage.channels.prefix')}</span>
                        {channel.name}
                      </Button>
                      <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
                        <span className="visually-hidden">{t('chatPage.channels.changeButton')}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item id={channel.id} data-change="deleteChannel" onClick={handelChangeChannel} href="#/action-1">
                          {t('chatPage.channels.deleteChannel')}
                        </Dropdown.Item>
                        <Dropdown.Item id={channel.id} data-change="renameChannel" onClick={handelChangeChannel} href="#/action-2">
                          {t('chatPage.channels.renameChannel')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
};

export default ChannelsField;
