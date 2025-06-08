import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteProduct, fetchProducts, fetchCategories } from '../../../services/api';
import EditProductModal from './EditProductModal';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const paginationModel = { page: 0, pageSize: 10 };

function TableProduct({ products, onProductUpdated, onProductDeleted }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (products) {
            setRows(products);
        }
    }, [products]);

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

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setRows(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits", error);
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        if (products && categories.length > 0) {
            const updatedProducts = products.map(product => {
                const category = categories.find(cat => cat.id === product.categoryId);
                return {
                    ...product,
                    categoryName: category ? category.name : 'Catégorie inconnue'
                };
            });
            setRows(updatedProducts);
        }
    }, [products, categories]);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setOpenEditModal(true);
    };

    const handleEditClose = () => {
        setOpenEditModal(false);
        setSelectedProduct(null);
    };

    const handleProductUpdated = (updatedProduct) => {
        const category = categories.find(cat => cat.id === updatedProduct.categoryId);
        updatedProduct.categoryName = category ? category.name : 'Catégorie inconnue';

        setRows((prevRows) =>
            prevRows.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
        handleEditClose();
    };

    const handleProductAdded = (newProduct) => {
        const category = categories.find(cat => cat.id === newProduct.categoryId);
        newProduct.categoryName = category ? category.name : 'Catégorie inconnue';

        setRows((prevRows) => [...prevRows, newProduct]);
        handleAddClose();
    };
    const handleDeleteClick = (productId) => {
        Swal.fire({
            title: 'Vous êtes sûr ?',
            text: 'Cette action est irréversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduct(productId);
                    onProductDeleted(productId);
                    setRows((prevRows) => prevRows.filter((product) => product.id !== productId));
                    Swal.fire(
                        'Supprimé',
                        'Le produit a été supprimé avec succès.',
                        'success'
                    );
                } catch (error) {
                    console.error("Erreur lors de la suppression du produit", error);
                    Swal.fire(
                        'Erreur',
                        'Une erreur est survenue lors de la suppression',
                        'error'
                    );
                }
            }
        });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nom du produit', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'price',
            headerName: 'Prix MGA',
            width: 60,
        },
        {
            field: 'quantity',
            headerName: 'Quantité',
            width: 70,
        },
        {
            field: 'categoryName',
            headerName: 'Catégorie',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <div className="flex">
                    <button
                        className="space-x-1 flex items-center justify-center"
                        onClick={() => handleEditClick(params.row)}
                    >
                        <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer" />
                    </button>
                    <button
                        className="my-4 py-2 px-4 space-x-1 flex items-center justify-center"
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-md shadow-md bg-white">
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.id}
                        loading={loading}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                </Paper>
                {openEditModal && selectedProduct && (
                    <EditProductModal
                        product={selectedProduct}
                        onClose={handleEditClose}
                        onProductUpdated={handleProductUpdated}
                    />
                )}
            </div>
        </>
    );
}

export default TableProduct;
