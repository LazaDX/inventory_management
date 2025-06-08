import TableCategory from "../../components/adminlayout/categories/TableCategory";
import TitleCategory from "../../components/adminlayout/categories/components/TitleCategory";
import { useState, useEffect } from "react";
import { fetchCategories } from "../../services/api";

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories : ", error);
            }
        };
        getCategories();
    }, []);

    const handleCategoryAdded = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    const handleCategoryUpdated = (updatedCategory) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category))
        );
    };

    const handleCategoryDeleted = (deletedCategoryId) => {
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== deletedCategoryId));
    };

    return (
        <>
            <div className="ml-60">
                <TitleCategory onCategoryAdded={handleCategoryAdded} />
                <TableCategory
                    categories={categories}
                    onCategoryUpdated={handleCategoryUpdated}
                    onCategoryDeleted={handleCategoryDeleted}
                />
            </div>
        </>
    );
}

export default Category;