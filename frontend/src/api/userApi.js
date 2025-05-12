// src/api/apiClient.js
import axios from 'axios';

// Base URL za vaš backend API - ažurirano na osnovu grešaka
const API_URL = 'http://localhost:8888/V-Inspect/backend';

// Kreiranje Axios instance s osnovnom konfiguracijom
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor za dodavanje autentifikacijskog tokena u zahtjeve
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authentication'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor za obradu grešaka
apiClient.interceptors.response.use(
    response => response,
    error => {
        // Automatsko odjavljivanje kod 401 greške (Unauthorized)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;