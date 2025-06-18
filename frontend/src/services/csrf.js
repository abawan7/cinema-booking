import axios from './axios';

export const getCsrfCookie = () => axios.get('/sanctum/csrf-cookie'); 