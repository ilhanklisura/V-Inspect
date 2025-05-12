// src/pages/users/UserDetail.js
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Divider,
    Chip,
    Alert,
    CircularProgress,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import userApi from '../../api/userApi';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Dohvat podataka o korisniku
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userData = await userApi.getUserById(id);
                setUser(userData);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Greška prilikom dohvaćanja podataka o korisniku.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    // Handler za povratak na listu korisnika
    const handleBack = () => {
        navigate('/users');
    };

    // Handler za uređivanje korisnika
    const handleEdit = () => {
        navigate(`/users/edit/${id}`);
    };

    // Odabir ikone na osnovu uloge korisnika
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <AdminPanelSettingsIcon />;
            case 'inspector':
                return <BadgeIcon />;
            default:
                return <PersonIcon />;
        }
    };

    // Odabir boje na osnovu uloge korisnika
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'error';
            case 'inspector':
                return 'warning';
            default:
                return 'primary';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                >
                    Nazad na listu
                </Button>

                {!loading && user && (
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                    >
                        Uredi korisnika
                    </Button>
                )}
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : user ? (
                <Paper sx={{ p: 3 }}>
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5" component="h1">
                            {user.name}
                        </Typography>
                        <Chip
                            icon={getRoleIcon(user.role)}
                            label={user.role}
                            color={getRoleColor(user.role)}
                            size="small"
                        />
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Osnovne informacije
                            </Typography>

                            <List disablePadding>
                                <ListItem disablePadding sx={{ py: 1 }}>
                                    <ListItemText
                                        primary="Email"
                                        secondary={user.email}
                                    />
                                </ListItem>

                                <ListItem disablePadding sx={{ py: 1 }}>
                                    <ListItemText
                                        primary="ID korisnika"
                                        secondary={user.id}
                                    />
                                </ListItem>

                                {user.created_at && (
                                    <ListItem disablePadding sx={{ py: 1 }}>
                                        <ListItemText
                                            primary="Datum kreiranja"
                                            secondary={new Date(user.created_at).toLocaleString()}
                                        />
                                    </ListItem>
                                )}

                                {user.updated_at && (
                                    <ListItem disablePadding sx={{ py: 1 }}>
                                        <ListItemText
                                            primary="Zadnja izmjena"
                                            secondary={new Date(user.updated_at).toLocaleString()}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Grid>

                        {/* Ovdje možete dodati dodatne sekcije za povezane entitete */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Aktivnosti korisnika
                            </Typography>

                            {/* Ovdje bi mogli prikazati povijest aktivnosti korisnika */}
                            <Box sx={{ py: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Podaci o aktivnostima korisnika bit će dostupni u nadogradnji.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <Alert severity="info">
                    Korisnik nije pronađen.
                </Alert>
            )}
        </Box>
    );
};

export default UserDetail;