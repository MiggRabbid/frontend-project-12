export default {
  translation: {
    header: {
      logoText: 'Hexlet Chat',
      button: 'выйти',
    },
    authorization: {
      login: {
        title: 'Войти',
        button: 'Войти',
        footer: {
          text: 'Нет аккаунта? ',
          link: 'Регистрация',
        },
        inputName: {
          label: 'Ваш ник',
          placeholder: 'Ваш ник',
        },
        inputPass: {
          label: 'Пароль',
          placeholder: 'Пароль',
        },
        errors: {
          invalidNameOrPass: 'Неверные имя пользователя или пароль',
        },
      },
      signUp: {
        title: 'Регистрация',
        button: 'Зарегистрироваться',
        inputName: {
          label: 'Имя пользователя',
          placeholder: 'От 3 до 20 символов',
        },
        inputPass: {
          label: 'Пароль',
          placeholder: 'Не менее 6 символов',
        },
        inputConfirmPass: {
          label: 'Подтвердите пароль',
          placeholder: 'Пароли должны совпадать',
        },
        errors: {
          invalidNameLength: 'от 3 до 20 символов',
          invalidPassLength: 'Не менее 6 символов',
          invalidPassConfirm: 'Пароли должны совпадать',
          required: 'Обязательное полe',
          thisUserExists: 'Такой пользователь уже существует',
        },
      },
    },
    chatPage: {
      channels: {
        title: 'Каналы',
        prefix: '# ',
        addButton: 'Добавить канал',
        changeButton: 'Изменить канал',
        removeChannel: 'Удалить',
        renameChannel: 'Переименовать',
      },
      chatField: {
        prefix: '# ',
        messageCount: {
          counter: {
            count_one: '{{count}} сообщение',
            count_few: '{{count}} сообщений',
            count_many: '{{count}} сообщений',
          },
        },
        messageInput: {
          lable: 'Новое сообщение',
          placeholder: 'Введите сообщение...',
        },
        sendButton: 'Отправить',
      },
    },
    modals: {
      addAndRename: {
        addTitle: 'Добавить канал',
        renameTitle: 'Переименовать канал',
        inputPlaceholder: 'Введите название канала (от 3 до 20 символов)',
        button: 'Отправить',
        errors: {
          invalidLength: 'От 3 до 20 символов',
          required: 'Обязательное поле',
          thisNameExists: 'Должно быть уникальны',
        },
      },
      delete: {
        title: 'Удалить канал',
        body: 'Уверены?',
        button: 'Удалить',
      },
      cancelButton: 'Отменить',
    },
    notFound: {
      errorNumber: 404,
      exclamation: 'Упс!',
      notFound: 'Страница не найдена',
      goOut: 'Но вы можете перейти на главную страницу',
      button: 'Вернуться',
    },
  },
};
