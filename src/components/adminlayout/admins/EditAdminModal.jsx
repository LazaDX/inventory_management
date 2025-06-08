import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { updateAdmin } from "../../../services/api";
import Swal from "sweetalert2";

const EditAdminModal = ({ admin, onClose, onAdminUpdated }) => {
    const [formData, SetFormData] = useState({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password,
        role: 'ADMIN',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const updatedAdmin = await updateAdmin(admin.id, formData);
            onAdminUpdated(updatedAdmin);
            Swal.fire({
                icon: 'success',
                title: 'Modification',
                text: 'L\'information de l\'administrateur a été modifé avec succès. ',
                confirmButtonText: 'OK',
            });
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'administrateur : ", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la modification de l\'information de l\'administrateur.',
                confirmButtonText: 'OK',
            });
        }
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
    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Modifier l'information
                </Typography>
                <TextField name="firstName" label="Nom" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="lastName" label="Prénom" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="password" label="Mot de passe" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Enregistrer
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleCancel}>
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditAdminModal;
