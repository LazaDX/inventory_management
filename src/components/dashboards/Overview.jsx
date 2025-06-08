import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const CommandeChart = () => {
    const [commandes, setCommandes] = useState([]);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: "area",
                height: 350,
                zoom: { enabled: true },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            markers: {
                size: 5,
                colors: ["#ff4560"],
                strokeWidth: 2,
            },
            xaxis: {
                categories: [],
                title: { text: "Mois" },
            },
            yaxis: {
                title: { text: "Nombre de commandes" },
            },
            tooltip: {
                x: { format: "MM/yyyy" },
            },
        },
    });


    const fetchCommandes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/commands");
            setCommandes(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes", error);
        }
    };


    const processData = (commandes) => {

        const allMonths = [
            "janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"
        ];


        const countsByMonth = new Array(12).fill(0);

        commandes.forEach((commande) => {
            const date = new Date(commande.orderDate); // on utilise orderDate
            const monthIndex = date.getMonth(); // 0 pour janvier, 1 pour février, etc.
            countsByMonth[monthIndex] += 1;
        });

        // On met à jour l'état du graphique
        setChartData({
            series: [{ name: "Nombre de commandes", data: countsByMonth }],
            options: {
                ...chartData.options,
                xaxis: { categories: allMonths },
            },
        });
    };

    // Appel de l'API lors du montage du composant
    useEffect(() => {
        fetchCommandes();
    }, []);

    // Mise à jour du graphique dès que les commandes sont récupérées
    useEffect(() => {
        if (commandes.length > 0) {
            processData(commandes);
        }
    }, [commandes]);

    return (
        <div style={{ width: "70%" }}>
            <div>
                {chartData.series.length > 0 ? (
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="area" // Area chart avec courbe lissée
                        height={350}
                    />
                ) : (
                    <p>Chargement des données...</p>
                )}
            </div>
        </div>
    );
};

export default CommandeChart;
