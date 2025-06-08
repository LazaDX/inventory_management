import TableProduct from "../../components/adminlayout/inventory/TableProduct";
import TitleInventory from "../../components/adminlayout/inventory/components/TitleInventory";
import { useEffect, useState } from "react";
import { fetchAdmins, fetchProducts } from "../../services/api";

function Inventory() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits : ", error);
            }
        };
        getProducts();
    }, []);

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
    };

    const handleProductDeleted = (deletedProductId) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== deletedProductId));
    };
    return (
        <>
            <div className="ml-60">
                <TitleInventory onProductAdded={handleProductAdded} />
                <TableProduct
                    products={products}
                    onProductAdded={handleProductUpdated}
                    onProductDeleted={handleProductDeleted}
                />
            </div>
        </>
    );
}

export default Inventory;