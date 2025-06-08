import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL
});


// USERS
export const fetchUsers = async () => {
    try {
        const response = await apiClient.get("/users");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        throw error;
    }
};

export const fetchClients = async () => {
    try {
        const response = await apiClient.get("/users/clients");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des clients", error);
        throw error;
    }
};

export const fetchAdmins = async () => {
    try {
        const response = await apiClient.get("/users/admins");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des administrateurs", error);
        throw error;
    }
};

export const addAdmin = async (admindata) => {
    try {
        const response = await apiClient.post("/users", admindata);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout d'un administrateur:", error);
        throw error;
    }
};

export const updateAdmin = async (id, admindata) => {
    try {
        const response = await apiClient.put(`/users/${id}`, admindata);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'administrateur", error);
        throw error;
    }
};

export const deleteAdmin = async (id) => {
    try {
        const response = await apiClient.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'administrateur", error);
        throw error;
    }
};

// CATEGORIES
export const fetchCategories = async () => {
    try {
        const response = await apiClient.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
        throw error;
    }
};

export const addCategory = async (categorydata) => {
    try {
        const response = await apiClient.post("/categories", categorydata);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout d'une catégorie: ", error);
        throw error;
    }
};

export const updateCategory = async (id, categorydata) => {
    try {
        const response = await apiClient.put(`/categories/${id}`, categorydata);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await apiClient.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie", error);
        throw error;
    }
};

// PRODUCTS
export const fetchProducts = async () => {
    try {
        const response = await apiClient.get("/products");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
        throw error;
    }
};

export const addProduct = async (inventorydata) => {
    try {
        const response = await apiClient.post("/products", inventorydata);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit", error);
        throw error;
    }
};

export const updateProduct = async (id, inventorydata) => {
    try {
        const response = await apiClient.put(`/products/${id}`, inventorydata);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await apiClient.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression du produit", error);
        throw error;
    }
};

// COMMANDS
export const fetchCommands = async () => {
    try {
        const response = await apiClient.get("/commands");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes", error);
        throw error;
    }
};
