import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const getLoanProducts = async () => {
  const response = await api.get('/loans/products');
  return response.data;
};

export const applyLoan = async (data) => {
  const response = await api.post('/loans/apply', data);
  return response.data;
};

export const getMyLoans = async () => {
  const response = await api.get('/loans/my-loans');
  return response.data;
};

export const getStaffDashboard = async () => {
  const response = await api.get('/dashboard/staff');
  return response.data;
};

export const getSavingsBalance = async () => {
  const response = await api.get('/savings/balance');
  return response.data;
};

export default api;
