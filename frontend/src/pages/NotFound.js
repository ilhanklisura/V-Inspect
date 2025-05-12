// src/pages/NotFound.js
import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 3
            }}
        >
            <Paper
                sx={{
                    maxWidth: 500,
                    p: 4,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h1" component="h1" sx={{ fontSize: '5rem', color: 'primary.main' }}>
                    404
                </Typography>

                <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                    Stranica nije pronađena
                </Typography>

                <Typography variant="body1" sx={{ mb: 4 }}>
                    Nažalost, stranica koju tražite ne postoji ili je premještena.
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                >
                    Natrag na početnu stranicu
                </Button>
            </Paper>
        </Box>
    );
};

export default NotFound;