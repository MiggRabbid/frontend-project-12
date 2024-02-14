import axios from 'axios';

const BASE_URL = '/api/v1/';

const axiosApi = (props) => {
  const {
    request, path, data, token,
  } = props;
  const currPath = `${BASE_URL}${path}`;
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 5000,
  };

  switch (request) {
    case 'post':
      return axios.post(currPath, data, params);
    case 'patch':
      return axios.patch(currPath, data, params);
    case 'delete':
      return axios.delete(currPath, params);
    default:
      return axios.get(currPath, params);
  }
};

export default axiosApi;
