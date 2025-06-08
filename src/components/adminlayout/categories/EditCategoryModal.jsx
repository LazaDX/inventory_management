import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { updateCategory } from "../../../services/api";
import Swal from "sweetalert2";

function EditCategoryModal({ category, onClose, onCategoryUpdated }) {
    const [formData, SetFormData] = useState({
        name: category.name,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const updatedCategory = await updateCategory(category.id, formData);
            onCategoryUpdated(updatedCategory);
            Swal.fire({
                icon: 'success',
                title: 'Modification',
                text: 'L\'information du catégorie a été modifé avec succès. ',
                confirmButtonText: 'OK',
            });
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du catégories : ", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la modification de l\'information du catégorie.',
                confirmButtonText: 'OK',
            });
        }
    }
    const handleCancel = () => {
        SetFormData({
            name: '',
        });
        onClose();
    };
    return (
        <>
            <Modal open={true} onClose={onClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Modifier l'information
                    </Typography>
                    <TextField name="name" label="Nom du catégorie" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
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
        </>
    );
}

export default EditCategoryModal;