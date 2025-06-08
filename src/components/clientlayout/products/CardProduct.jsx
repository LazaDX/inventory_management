import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

function CardProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products")
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des produits", error);
                setLoading(false);
            });
    }, []);

    const handleOrder = async (product, quantityValue) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Utilisateur non connecté ! Veuillez vous reconnecter.",
                confirmButtonText: "OK",
            });
            return;
        }

        const computedQuantity = quantityValue === "" ? 1 : parseInt(quantityValue, 10);
        const totalPrice = product.price * computedQuantity;

        const orderPayload = {
            productId: product.id,
            quantity: computedQuantity,
            description: product.description,
            total: totalPrice,
            userId: parseInt(userId, 10),
            orderDate: new Date().toISOString()
        };

        try {
            const response = await axios.post("http://localhost:8080/api/commands", orderPayload);
            console.log("Commande effectuée avec succès", response.data);
            Swal.fire({
                icon: "success",
                title: "Produit ajouté",
                text: "La commande a été effectuée avec succès.",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error("Erreur lors de la commande", error);
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur est survenue lors de la commande du produit.",
                confirmButtonText: "OK",
            });
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="flex flex-wrap gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onOrder={handleOrder} />
            ))}
        </div>
    );
}

function ProductCard({ product, onOrder }) {
    const [quantity, setQuantity] = useState("1");

    const computedQuantity = quantity === "" ? 1 : parseInt(quantity, 10);
    const totalPrice = product.price * computedQuantity;

    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value, 10) || 0;

        if (value > product.stock) {
            Swal.fire({
                icon: "warning",
                title: "Stock insuffisant",
                text: `Stock disponible : ${product.stock} `,
                confirmButtonText: "OK",
            });
            value = product.stock;
        }


        if (value > 50) {
            Swal.fire({
                icon: "warning",
                title: "Quantité limitée",
                text: "Vous ne pouvez pas commander plus de 50 unités.",
                confirmButtonText: "OK",
            });
            value = 50;
        }

        setQuantity(value);
    };

    const handleOrderClick = () => {
        const finalQuantity = quantity === "" ? 1 : parseInt(quantity, 10);
        if (finalQuantity > 0) {
            onOrder(product, quantity);
        } else {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Veuillez entrer une quantité valide.",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div>
            <div className="border p-5 m-1 rounded-md shadow-md w-60">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-sm mb-2 text-gray-500">{product.description}</p>
                <p className="text-sm mb-2"> {product.price} Ar</p>
                <p className="text-sm mb-2">Stock disponible : {product.quantity}</p>

                <div className="mb-2">
                    <label htmlFor={`quantity-${product.id}`} className="block text-sm mb-1">Quantité :</label>
                    <input
                        type="number"
                        placeholder="Quantité"
                        id={`quantity-${product.id}`}
                        className="border rounded-lg border-blue-200 px-2 py-1 w-full"
                        value={quantity}
                        min="1"
                        max="50"
                        onChange={handleQuantityChange}
                    />
                </div>

                <p className="text-sm mb-4">Total : {totalPrice} MGA</p>

                <button
                    onClick={handleOrderClick}
                    className="mt-2 text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 py-1 px-4 rounded flex items-center justify-center gap-2 w-full"
                >
                    <FontAwesomeIcon icon={faCartPlus} />
                    Commander
                </button>
            </div>
        </div>

    );
}

export default CardProduct;
