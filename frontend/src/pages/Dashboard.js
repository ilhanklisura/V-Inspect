// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Alert, Box, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

const DashboardCard = ({ title, subtitle, count, linkTo }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="textSecondary">{subtitle}</Typography>
            </Box>
            <Typography variant="h3" component="div" mb={2}>
                {count}
            </Typography>
            <Link to={linkTo} style={{ textDecoration: 'none' }}>
                <Button variant="text" color="primary">
                    View {title}
                </Button>
            </Link>
        </Paper>
    );
};

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        users: 0,
        vehicles: 0,
        inspections: 0
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const fetchData = async () => {
        try {
            setError(null);
            setLoading(true);
            console.log('Fetching dashboard data...');

            // Try to get users count
            try {
                const usersResponse = await apiClient.get('/users');
                console.log('Users data:', usersResponse.data);
                setDashboardData(prevData => ({
                    ...prevData,
                    users: Array.isArray(usersResponse.data) ? usersResponse.data.length : 0
                }));
            } catch (userErr) {
                console.error('Failed to fetch users:', userErr);
            }

            // Try to get vehicles count - might not exist yet
            try {
                const vehiclesResponse = await apiClient.get('/vehicles');
                setDashboardData(prevData => ({
                    ...prevData,
                    vehicles: Array.isArray(vehiclesResponse.data) ? vehiclesResponse.data.length : 0
                }));
            } catch (vehicleErr) {
                console.log('Vehicle endpoint not available yet');
            }

            // Try to get inspections count - might not exist yet
            try {
                const inspectionsResponse = await apiClient.get('/inspections');
                setDashboardData(prevData => ({
                    ...prevData,
                    inspections: Array.isArray(inspectionsResponse.data) ? inspectionsResponse.data.length : 0
                }));
            } catch (inspectionErr) {
                console.log('Inspection endpoint not available yet');
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Error retrieving dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Welcome, {currentUser?.name || 'User'}!
                </Typography>
                <Typography variant="body1">
                    This is the V-Inspect dashboard. From here you can manage all aspects of the application.
                </Typography>
            </Paper>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <DashboardCard
                            title="Users"
                            subtitle="User account management"
                            count={dashboardData.users}
                            linkTo="/users"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DashboardCard
                            title="Vehicles"
                            subtitle="Vehicle management"
                            count={dashboardData.vehicles}
                            linkTo="/vehicles"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DashboardCard
                            title="Inspections"
                            subtitle="Inspection management"
                            count={dashboardData.inspections}
                            linkTo="/inspections"
                        />
                    </Grid>
                </Grid>
            )}

            <Typography variant="h5" gutterBottom>
                Recent Activity
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Typography>Recent activity data will be available in future updates.</Typography>
            </Paper>
        </div>
    );
};

export default Dashboard;