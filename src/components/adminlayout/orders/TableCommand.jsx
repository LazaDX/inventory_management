import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, CircularProgress } from "@mui/material";
import { fetchCommands, fetchClients, fetchProducts } from "../../../services/api";

const paginationModel = { page: 0, pageSize: 10 };

function TableCommand() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const [commandsData, clientsData, productsData] = await Promise.all([
                fetchCommands(),
                fetchClients(),
                fetchProducts(),
            ]);

            const clientsMap = new Map();
            clientsData.forEach((client) => {
                clientsMap.set(String(client.id), client);
            });
            const productsMap = new Map();
            productsData.forEach((product) => {
                productsMap.set(String(product.id), product);
            });

            const enrichedCommands = commandsData.map((command) => {
                const client = clientsMap.get(String(command.userId));
                const product = productsMap.get(String(command.productId));

                return {
                    ...command,
                    clientName: client ? `${client.firstName} ${client.lastName}` : "Inconnu",
                    clientEmail: client ? client.email : "Non disponible",
                    productName: product ? product.name : "Inconnu",
                    price: product ? `${product.price} Ar` : "N/A",
                    totalFormatted: `${command.total} Ar`,
                };
            });

            setData(enrichedCommands);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des données", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
        const interval = setInterval(() => {
            getData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "clientName", headerName: "Nom du client", width: 180 },
        { field: "clientEmail", headerName: "Email", width: 220 },
        { field: "productName", headerName: "Produit", width: 180 },
        { field: "price", headerName: "Prix Unitaire", width: 120 },
        { field: "quantity", headerName: "Quantité", width: 100 },
        { field: "totalFormatted", headerName: "Total", width: 120 },
    ];

    return (
        <div className="rounded-md shadow-md bg-white">
            <Paper sx={{ height: 450, width: "100%", padding: 2 }}>
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <CircularProgress />
                    </div>
                ) : (
                    <DataGrid
                        rows={data}
                        columns={columns}
                        getRowId={(row) => row.id}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                )}
            </Paper>
        </div>
    );
}

export default TableCommand;
