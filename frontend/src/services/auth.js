import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
}; 