import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { width } from '@mui/system';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteAdmin, fetchAdmins, updateAdmin } from "../../../services/api";
import EditAdminModal from './EditAdminModal';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const paginationModel = { page: 0, pageSize: 10 };

function TableAdmin({ admins, onAdminUpdated, onAdminDeleted }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    useEffect(() => {
        setRows(admins);
    }, [admins]);

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const data = await fetchAdmins();
                setRows(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
            }
        };
        getAdmins();
    }, []);

    const handleEditClick = (admin) => {
        setSelectedAdmin(admin);
        setOpenEditModal(true);
    }

    const handleEditClose = () => {
        setOpenEditModal(false);
        setSelectedAdmin(null);
    }

    const handleAdminUpdated = (updatedAdmin) => {
        setRows((prevRows) =>
            prevRows.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin))
        );
        handleEditClose();
    };

    const handleDeleteClick = (adminId) => {
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
                    await deleteAdmin(adminId);
                    onAdminDeleted(adminId);
                    Swal.fire(
                        'Supprimé',
                        'L\'administrateur a été supprimé avec succès.',
                        'success'
                    );
                } catch (error) {
                    console.error("Erreur lors de la suppression de l'administrateur", error);
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
        { field: 'firstName', headerName: 'Nom', width: 130 },
        { field: 'lastName', headerName: 'Prénom', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
        },
        {
            field: 'fullName',
            headerName: 'Nom complet',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        {
            field: 'role',
            headerName: 'Rôle',
            width: 70,
        },
        {
            field: 'password',
            headerName: 'Mot de passe',
            width: 90,
        },
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
                {openEditModal && selectedAdmin && (
                    <EditAdminModal
                        admin={selectedAdmin}
                        onClose={handleEditClose}
                        onAdminUpdated={handleAdminUpdated}
                    />
                )}
            </div>
        </>
    );
}

export default TableAdmin;