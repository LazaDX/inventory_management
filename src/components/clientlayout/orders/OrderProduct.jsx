import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const paginationModel = { page: 0, pageSize: 10 };

function OrderProduct() {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Utilisateur non connecté, veuillez vous connecter.',
                confirmButtonText: 'OK',
            });
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:8080/api/commands/client/${userId}`)
            .then(response => {
                const ordersData = response.data;
                axios.get(`http://localhost:8080/api/products`)
                    .then(prodResponse => {
                        const products = prodResponse.data;
                        const productMap = {};
                        products.forEach(prod => {
                            productMap[prod.id] = prod.name;
                        });

                        const enrichedOrders = ordersData.map(order => ({
                            ...order,
                            productName: productMap[order.productId] || "Inconnu"
                        }));
                        setOrders(enrichedOrders);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des produits", error);
                        setOrders(ordersData);
                        setLoading(false);
                    });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des commandes", error);
                setLoading(false);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'productName', headerName: 'Produit', width: 200 },
        { field: 'quantity', headerName: 'Quantité', width: 100 },
        { field: 'total', headerName: 'Total (MGA)', width: 120 },
    ];

    return (
        <div className="rounded-md shadow-md bg-white">
            <Paper sx={{ height: 400, width: '100%' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        getRowId={(row) => row.id}
                        loading={loading}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                )}
            </Paper>
        </div>
    );
}

export default OrderProduct;
