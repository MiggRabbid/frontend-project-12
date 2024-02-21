export default {
  translation: {
    header: {
      logoText: 'Hexlet Chat',
      button: 'Log Out',
    },
    authorization: {
      login: {
        title: 'Log In',
        button: 'Log In',
        footer: {
          text: "Don't have an account? ",
          link: 'Sign Up',
        },
        inputName: {
          label: 'Your Nickname',
          placeholder: 'Your Nickname',
        },
        inputPass: {
          label: 'Password',
          placeholder: 'Password',
        },
        errors: {
          invalidNameOrPass: 'Invalid username or password',
        },
      },
      signUp: {
        title: 'Sign Up',
        button: 'Sign Up',
        inputName: {
          label: 'Username',
          placeholder: '3 to 20 characters',
        },
        inputPass: {
          label: 'Password',
          placeholder: 'At least 6 characters',
        },
        inputConfirmPass: {
          label: 'Confirm Password',
          placeholder: 'Passwords must match',
        },
      },
    },
    chatPage: {
      channels: {
        title: 'Channels',
        prefix: '# ',
        addButton: '+',
        changeButton: 'Channel Management',
        deleteChannel: 'Delete',
        renameChannel: 'Rename',
      },
      chatField: {
        prefix: '# ',
        messageCount: {
          counter: {
            count_one: '{{count}} message',
            count_few: '{{count}} messages',
            count_many: '{{count}} messages',
          },
        },
        messageInput: {
          lable: 'New Message',
          placeholder: 'Type your message...',
        },
        sendButton: 'Send',
      },
    },
    modals: {
      addAndRename: {
        addChannel: 'Add Channel',
        renameChannel: 'Rename Channel',
        inputPlaceholder: 'Channel Name',
        button: 'Send',
      },
      delete: {
        title: 'Delete Channel',
        body: 'Are you sure?',
        button: 'Delete',
      },
      cancelButton: 'Cancel',
    },
    notFound: {
      errorNumber: 404,
      exclamation: 'Oops!',
      notFound: 'Page Not Found',
      goOut: 'But you can go back to the main page',
      button: 'Go Back',
    },
    validationError: {
      wronglengthName: '3 to 20 characters',
      wronglengthPass: 'At least 6 characters',
      invalidPassConfirm: 'Passwords must match',
      requiredField: 'This field is required',
      thisUserExists: 'This user already exists',
      thisNameExists: 'Must be unique',
    },
    toasts: {
      auth: {
        unknownErr: 'Unknown error',
        networkErr: 'Connection error',
      },
      addChannel: {
        success: 'Channel created',
        error: 'Error creating channel',
      },
      renameChannel: {
        success: 'Channel renamed',
        error: 'Error renaming channel',
      },
      deleteChannel: {
        success: 'Channel deleted',
        error: 'Error deleting channel',
      },
    },
  },
};
