import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, IconButton, InputAdornment, FormControl, InputLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
    // Déclaration des états pour email, password et visibility du mot de passe
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Fonction de gestion de la soumission du formulaire
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password,
            });

            console.log("Réponse du serveur:", response.data);

            // Si l'ID utilisateur est présent, on suppose que la connexion est réussie
            if (response.data.id) {
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("userRole", response.data.role);

                if (response.data.role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else if (response.data.role === "CLIENT") {
                    navigate("/client/product");
                } else {
                    alert("Rôle non trouvé");
                    console.warn("Rôle non reconnu, redirection vers la page d'accueil par défaut.");
                    navigate("/");
                }
            } else {
                alert("Identifiants incorrects");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            alert("Erreur lors de la connexion");
        }
    };

    // Fonction pour afficher ou masquer le mot de passe
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-500">Connexion</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <TextField
                            label="Adresse Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            required
                            className="rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="password"></InputLabel>
                            <TextField
                                id="password"
                                label="Mot de passe"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                variant="outlined"
                                className="rounded-lg"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="rounded-lg py-2 mt-4"
                    >
                        Se connecter
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Pas encore inscrit ?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
                            Créez un compte
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
