import axios from 'axios';

// During React development, Vite forwards /api requests to ASP.NET Core.
// After React is published inside wwwroot, /api uses the same website address.
const baseURL = (import.meta.env.VITE_API_URL || 'https://localhost:7107/api').replace(/\/$/, '');

const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      'Could not connect to the API.';

    return Promise.reject(new Error(message));
  },
);

export { baseURL };
export default axiosClient;
