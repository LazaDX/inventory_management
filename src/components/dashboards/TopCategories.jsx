import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const TopCategories = () => {
    const [commandes, setCommandes] = useState([]);
    const [produits, setProduits] = useState([]);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: "polarArea",
                height: 350,
            },
            labels: [],
            fill: {
                opacity: 0.8,
            },
            legend: {
                position: "top",
            },
            tooltip: {
                y: {
                    formatter: (value) => `${value} commandes`,
                },
            },
        },
    });


    const fetchCommandes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/commands");
            setCommandes(response.data);
            console.log("Commandes:", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes", error);
        }
    };


    const fetchProduits = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/products");
            console.log("Commandes:", response.data);
            console.log("Produits:", response.data);
            setProduits(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits", error);
        }
    };


    const processData = (commandes, produits) => {

        const produitCategories = {};
        produits.forEach((produit) => {
            produitCategories[produit.id] = produit.categoryId;
        });


        const categoryCounts = {};

        commandes.forEach((commande) => {
            const categoryId = produitCategories[commande.productId];
            if (categoryId) {
                categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
            }
        });


        const sortedCategories = Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);


        const topCategories = sortedCategories.map(([category]) => category);
        const topCategoryCounts = sortedCategories.map(([_, count]) => count);

        setChartData({
            series: topCategoryCounts,
            options: {
                ...chartData.options,
                labels: topCategories,
            },
        });
    };


    useEffect(() => {
        fetchCommandes();
        fetchProduits();
    }, []);


    useEffect(() => {
        if (commandes.length > 0 && produits.length > 0) {
            processData(commandes, produits);
        }
    }, [commandes, produits]);

    return (
        <div style={{ width: "40%" }}>
            <div>
                {chartData.series.length > 0 ? (
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="polarArea"
                        height={350}
                    />
                ) : (
                    <p>Chargement des données...</p>
                )}
            </div>
        </div>
    );
};

export default TopCategories;

