import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { deleteCategory, fetchCategories } from '../../../services/api';
import EditCategoryModal from './EditCategoryModal';

const paginationModel = { page: 0, pageSize: 10 };

function TableCategory({ categories, onCategoryUpdated, onCategoryDeleted }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    useEffect(() => {
        setRows(categories);
    }, [categories]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setRows(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories", error);
            }
        };
        getCategories();
    }, []);

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setOpenEditModal(true);
    }

    const handleEditClose = () => {
        setOpenEditModal(false);
        setSelectedCategory(null);
    }

    const handleCategoryUpdated = (updatedCategory) => {
        setRows((prevRows) =>
            prevRows.map((category) => (category.id === updatedCategory.id ? updatedCategory : category))
        );
        handleEditClose();
    };

    const handleDeleteClick = (categoryId) => {
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
                    await deleteCategory(categoryId);
                    onCategoryDeleted(categoryId);
                    Swal.fire(
                        'Supprimé',
                        'La catégorie a été supprimé avec succès.',
                        'success'
                    );
                } catch (error) {
                    console.error("Erreur lors de la suppression du catégorie", error);
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
        { field: 'name', headerName: 'Nom du catégorie', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="flex">
                        <button
                            className="  space-x-1 flex items-center justify-center"
                            onClick={() => handleEditClick(params.row)}
                        >
                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer" />
                        </button>
                        <button
                            className="my-4 py-2 px-4  space-x-1 flex items-center justify-center"
                            onClick={() => handleDeleteClick(params.row.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
                        </button>
                    </div>
                );
            },
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
                {openEditModal && selectedCategory && (
                    <EditCategoryModal
                        category={selectedCategory}
                        onClose={handleEditClose}
                        onCategoryUpdated={handleCategoryUpdated}
                    />
                )}
            </div>
        </>
    );
}

export default TableCategory;