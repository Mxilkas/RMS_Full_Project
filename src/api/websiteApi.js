import axiosClient from './axiosClient.js';

export async function getHomeContent() {
  const response = await axiosClient.get('/website/home');
  return response.data;
}

export async function getAboutContent() {
  const response = await axiosClient.get('/website/about');
  return response.data;
}

export async function getContactContent() {
  const response = await axiosClient.get('/website/contact');
  return response.data;
}

export async function sendContactMessage(payload) {
  const response = await axiosClient.post('/website/contact', payload);
  return response.data;
}
