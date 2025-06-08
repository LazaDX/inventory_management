import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { width } from '@mui/system';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { fetchClients } from '../../../services/api';
import { useEffect, useState } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'email',
        headerName: 'email',
        width: 150,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        field: 'role',
        headerName: 'Rôle',
        width: 80,
    },
    // {
    //     field: 'action',
    //     headerName: 'Action',
    //     width: 80,
    //     renderCell: (params) => {
    //         return (
    //             <button className="my-4 py-2 px-4  space-x-2 flex items-center justify-center">
    //                 <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer" />
    //                 <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
    //             </button>
    //         )
    //     }
    // }
];

const paginationModel = { page: 0, pageSize: 10 };

function TableCustomer() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getClients = async () => {
            try {
                const data = await fetchClients();
                setRows(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
            }
        };
        getClients();
    }, []);
    return (
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
        </div>

    );
}

export default TableCustomer;