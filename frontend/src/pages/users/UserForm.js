// src/pages/users/UserForm.js
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Alert,
    CircularProgress,
    MenuItem,
    Grid
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import userApi from '../../api/userApi';

const UserForm = () => {
    const { id } = useParams(); // ID korisnika za uređivanje (ako postoji)
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user' // Defaultna vrijednost
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    // Dohvat podataka o korisniku za uređivanje
    useEffect(() => {
        const fetchUserData = async () => {
            if (isEditMode) {
                try {
                    setLoading(true);
                    const userData = await userApi.getUserById(id);
                    // Ne prikazujemo password u formi za editovanje
                    setFormData({
                        name: userData.name || '',
                        email: userData.email || '',
                        password: '',
                        confirmPassword: '',
                        role: userData.role || 'user'
                    });
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError('Greška prilikom dohvaćanja podataka o korisniku.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [id, isEditMode]);

    // Handler za promjenu input polja
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validacija forme
    const validateForm = () => {
        // Provjera obaveznih polja
        if (!formData.name || !formData.email || (!isEditMode && !formData.password)) {
            setError('Molimo popunite sva obavezna polja.');
            return false;
        }

        // Provjera email formata
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Unesite validan email.');
            return false;
        }

        // Provjera lozinke
        if (!isEditMode || (formData.password && formData.password.length > 0)) {
            if (formData.password.length < 6) {
                setError('Lozinka mora imati najmanje 6 znakova.');
                return false;
            }

            if (formData.password !== formData.confirmPassword) {
                setError('Lozinke se ne podudaraju.');
                return false;
            }
        }

        return true;
    };

    // Handler za slanje forme
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Resetiranje poruka
        setError('');
        setSuccess('');

        // Validacija forme
        if (!validateForm()) return;

        try {
            setLoading(true);

            // Priprema podataka za slanje
            const userData = {
                name: formData.name,
                email: formData.email,
                role: formData.role
            };

            // Dodaj lozinku ako je unesena (obavezno kod kreiranja)
            if (!isEditMode || (formData.password && formData.password.length > 0)) {
                userData.password = formData.password;
            }

            if (isEditMode) {
                // Ažuriranje postojećeg korisnika
                await userApi.updateUser(id, userData);
                setSuccess('Korisnik uspješno ažuriran');
            } else {
                // Kreiranje novog korisnika
                await userApi.createUser(userData);
                setSuccess('Korisnik uspješno kreiran');

                // Resetiranje forme nakon uspješnog kreiranja
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: 'user'
                });
            }
        } catch (err) {
            console.error('Error saving user:', err);
            setError(err.response?.data?.message || 'Greška prilikom spremanja korisnika.');
        } finally {
            setLoading(false);
        }
    };

    // Handler za odustajanje/povratak na listu
    const handleCancel = () => {
        navigate('/users');
    };

    return (
        <Box>
            <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
                {isEditMode ? 'Uređivanje korisnika' : 'Dodavanje novog korisnika'}
            </Typography>

            <Paper sx={{ p: 3 }}>
                {loading && !isEditMode ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleSubmit}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                {success}
                            </Alert>
                        )}

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Ime i prezime"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email adresa"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label={isEditMode ? "Nova lozinka (ostavite prazno ako ne mijenjate)" : "Lozinka"}
                                    name="password"
                                    type="password"
                                    required={!isEditMode}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="confirmPassword"
                                    label="Potvrdite lozinku"
                                    name="confirmPassword"
                                    type="password"
                                    required={!isEditMode || (formData.password && formData.password.length > 0)}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="role"
                                    label="Uloga"
                                    name="role"
                                    select
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="user">Korisnik</MenuItem>
                                    <MenuItem value="admin">Administrator</MenuItem>
                                    <MenuItem value="inspector">Inspektor</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                            >
                                Odustani
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? 'Spremanje...' : isEditMode ? 'Spremi promjene' : 'Kreiraj korisnika'}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default UserForm;