import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { addCategory } from "../../../services/api";
import Swal from "sweetalert2";

function AddCategoryModal({ onClose, onCategoryAdded }) {
    const [formData, SetFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetFormData({ ...formData, [name]: value });
    }

    const handleCancel = () => {
        SetFormData({
            name: '',
        });
        onClose();
    }
    const handleSubmit = async () => {
        try {
            const newCategory = await addCategory(formData);
            onCategoryAdded(newCategory);
            Swal.fire({
                icon: 'success',
                title: 'Catégorie ajouté',
                text: 'La nouvelle catégorie a été ajouté avec succès',
                confirmButtonText: 'OK',
            });
            onClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout du catégorie: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l\'ajout du catégorie.',
                confirmButtonText: 'OK',
            });
        }
    }
    return (
        <>
            <Modal open={true} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)', width: 400,
                        bgcolor: 'background.paper', boxShadow: 24, p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        Ajouter du catégorie
                    </Typography>
                    <TextField
                        name="name"
                        label="Nom du catégorie"
                        value={formData.name}
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
        </>
    );
}

export default AddCategoryModal;