import axiosClient from './axiosClient.js';

export async function getDashboardSummary() {
  const response = await axiosClient.get('/dashboard');
  return response.data;
}

export async function getReportsSummary() {
  const response = await axiosClient.get('/reports/summary');
  return response.data;
}

export async function getPropertiesByStatus() {
  const response = await axiosClient.get('/reports/properties-by-status');
  return response.data;
}

export async function getPaymentsByType() {
  const response = await axiosClient.get('/reports/payments-by-type');
  return response.data;
}
