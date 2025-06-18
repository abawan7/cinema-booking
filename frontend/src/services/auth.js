import axios from './axios';
import { getCsrfCookie } from './csrf';

export const register = async (data) => {
    await getCsrfCookie();
    return axios.post('/api/register', data); // Add /api prefix
};

export const login = async (data) => {
    await getCsrfCookie();
    return axios.post('/api/login', data); // Add /api prefix
};
