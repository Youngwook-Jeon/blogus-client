import axios from 'axios';

const SERVER_URL = 'http://localhost:8080';

export const postAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.post(SERVER_URL + `/api/${url}`, post, {
    headers: { Authorization: token ? 'Bearer ' + token : token }
  });

  return res;
};

export const getAPI = async (url: string, token?: string) => {
  const res = await axios.get(SERVER_URL + `/api/${url}`, {
    headers: { Authorization: token ? 'Bearer ' + token : token }
  });

  return res;
};

export const patchAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.patch(SERVER_URL + `/api/${url}`, post, {
    headers: { Authorization: token ? 'Bearer ' + token : token }
  });

  return res;
};

export const deleteAPI = async (url: string, token?: string) => {
  const res = await axios.delete(SERVER_URL + `/api/${url}`, {
    headers: { Authorization: token ? 'Bearer ' + token : token }
  });

  return res;
};

export const putAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.put(SERVER_URL + `/api/${url}`, post, {
    headers: { Authorization: token ? 'Bearer ' + token : token }
  });

  return res;
};