import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { addAdmin } from "../../../services/api";
import Swal from "sweetalert2";

const AddAdminModal = ({ onClose, onAdminAdded }) => {
    const [formData, SetFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'ADMIN',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        SetFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',

        });
        onClose();
    };

    const handleSubmit = async () => {
        try {
            const newAdmin = await addAdmin(formData);
            onAdminAdded(newAdmin);
            Swal.fire({
                icon: 'success',
                title: 'Administrateur ajouté',
                text: 'Le nouvel administrateur a été ajouté avec succès',
                confirmButtonText: 'OK',
            });
            onClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'administrateur: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l\'ajout de l\'administrateur.',
                confirmButtonText: 'OK',
            });
        }
    }
    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', width: 400,
                    bgcolor: 'background.paper', boxShadow: 24, p: 4,
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Ajouter un administrateur
                </Typography>
                <TextField
                    name="firstName"
                    label="Nom"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="lastName"
                    label="Prénom"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="password"
                    label="Mot de passe"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Ajouter
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleCancel}>
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddAdminModal