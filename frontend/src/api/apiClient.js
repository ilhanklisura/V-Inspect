// src/api/apiClient.js
import axios from 'axios';

// Base URL za vaš backend API - ovo mora biti ispravna putanja
const API_URL = 'http://localhost:8888/V-Inspect/backend';

// Kreiranje Axios instance s osnovnom konfiguracijom
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Debug interceptor za zahtjeve
apiClient.interceptors.request.use(
    config => {
        console.log('API Request:', {
            url: `${config.baseURL}${config.url}`,
            method: config.method,
            data: config.data,
            headers: config.headers
        });

        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authentication'] = token;
        }
        return config;
    },
    error => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Debug interceptor za odgovore
apiClient.interceptors.response.use(
    response => {
        console.log('API Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    error => {
        console.error('API Response Error:', error);

        // Log detailed error information
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        }

        // Automatsko odjavljivanje kod 401 greške (Unauthorized)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;