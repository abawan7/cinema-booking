// axios.js
import Axios from 'axios';
import { ApiEndpoint } from './settings.js';

const axios = Axios.create({
    baseURL: ApiEndpoint || 'http://localhost:8000',  // Fallback if ApiEndpoint is not defined
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"  // Add this for Laravel to recognize AJAX requests
    },
});

// Add this to handle CSRF token
axios.interceptors.request.use(function (config) {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
    }
    return config;
});

export default axios;
