import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { updateProduct, fetchCategories } from "../../../services/api";
import Swal from "sweetalert2";

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        categoryId: product.categoryId,
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories", error);
            }
        };
        getCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = async () => {
        try {
            const updatedProduct = await updateProduct(product.id, formData);
            onProductUpdated(updatedProduct);
            Swal.fire({
                icon: "success",
                title: "Produit modifié",
                text: "Les informations du produit ont été mises à jour avec succès.",
                confirmButtonText: "OK",
            });
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du produit", error);
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur est survenue lors de la mise à jour du produit.",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Modifier le produit
                </Typography>
                <TextField
                    name="name"
                    label="Nom du produit"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="quantity"
                    label="Quantité"
                    value={formData.quantity}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    name="price"
                    label="Prix"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-select-label">Catégorie</InputLabel>
                    <Select
                        labelId="category-select-label"
                        name="categoryId"
                        value={
                            categories.some(cat => cat.id === formData.categoryId)
                                ? formData.categoryId
                                : ""
                        }
                        label="Catégorie"
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Enregistrer
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleCancel}>
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Modal >
    );
};

export default EditProductModal;
