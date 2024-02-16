const apiPath = '/api/v1';

export default {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  loginRequestPath: () => [apiPath, 'login'].join('/'),
  signupRequestPath: () => [apiPath, 'signup'].join('/'),
  dataRequestPath: (path) => [apiPath, path].join('/'),
};
