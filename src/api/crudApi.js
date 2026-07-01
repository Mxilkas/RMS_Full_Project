import axiosClient from './axiosClient.js';

export async function getRecords(endpoint, params = {}) {
  const response = await axiosClient.get(endpoint, { params });
  return response.data;
}

export async function getRecord(endpoint, id) {
  const response = await axiosClient.get(`${endpoint}/${id}`);
  return response.data;
}

export async function createRecord(endpoint, payload) {
  const response = await axiosClient.post(endpoint, payload);
  return response.data;
}

export async function updateRecord(endpoint, id, payload) {
  const response = await axiosClient.put(`${endpoint}/${id}`, payload);
  return response.data;
}

export async function deleteRecord(endpoint, id) {
  const response = await axiosClient.delete(`${endpoint}/${id}`);
  return response.data;
}
