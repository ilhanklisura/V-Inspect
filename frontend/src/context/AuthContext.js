// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setCurrentUser(null);
    };

    const fetchUserData = useCallback(async (userId) => {
        try {
            console.log('Fetching user data for ID:', userId);
            const response = await apiClient.get(`/users/${userId}`);
            console.log('User data received:', response.data);
            setCurrentUser(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user data:', err);
            logout();
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        console.log('Auth init - Token exists:', !!token, 'User ID:', userId);

        if (token && userId) {
            fetchUserData(userId);
        } else {
            setLoading(false);
        }
    }, [fetchUserData]);

    const login = async (email, password) => {
        try {
            setError(null);
            console.log('Login attempt for:', email);

            // First, get all users to find a match (for demo purposes)
            // In production, you should use a proper login endpoint
            const response = await apiClient.get('/users');
            const users = response.data;
            console.log('All users fetched:', users);

            const user = users.find(u => u.email === email);
            console.log('Matching user found:', user);

            if (user) {
                // In production, you should verify password on the server side
                // This is just for demonstration purposes
                setCurrentUser(user);
                // Store auth data in localStorage
                const dummyToken = 'dummy-auth-token-' + Math.random();
                localStorage.setItem('token', dummyToken);
                localStorage.setItem('userId', user.id);
                console.log('Login successful. User ID stored:', user.id);
                return user;
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.message || 'Login failed');
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            setError(null);

            // Ensure role is set to an allowed value
            userData.role = 'vehicle_owner';

            console.log('Sending registration data:', userData);

            const response = await apiClient.post('/users', userData);

            console.log('Registration response:', response.data);
            return response.data;
        } catch (err) {
            console.error('Registration error details:', err);

            // Better error handling
            if (err.response) {
                setError(err.response.data?.message || `Error ${err.response.status}: ${err.response.statusText}`);
            } else if (err.request) {
                setError('No response from server. Check your network connection.');
            } else {
                setError(err.message || 'Registration failed');
            }
            throw err;
        }
    };

    const value = {
        currentUser,
        loading,
        error,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};