import axiosClient from './axiosClient.js';

export async function loginUser(username, password) {
  const response = await axiosClient.post('/auth/login', { username, password });
  return response.data;
}
