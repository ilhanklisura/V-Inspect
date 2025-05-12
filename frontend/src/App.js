// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';

// Stranice
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import UserList from './pages/users/UserList';
import UserForm from './pages/users/UserForm';
import UserDetail from './pages/users/UserDetail';
import NotFound from './pages/NotFound';

// Layout
import Layout from './components/layout/Layout';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

// ProtectedRoute komponenta
const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        {/* Auth rute */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Zaštićene rute */}
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        {/* User rute */}
                        <Route path="/users" element={
                            <ProtectedRoute>
                                <Layout>
                                    <UserList />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        <Route path="/users/new" element={
                            <ProtectedRoute>
                                <Layout>
                                    <UserForm />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        <Route path="/users/edit/:id" element={
                            <ProtectedRoute>
                                <Layout>
                                    <UserForm />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        <Route path="/users/:id" element={
                            <ProtectedRoute>
                                <Layout>
                                    <UserDetail />
                                </Layout>
                            </ProtectedRoute>
                        } />

                        {/* Fallback ruta za 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;