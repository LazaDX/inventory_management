import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, IconButton, InputAdornment, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Fonction pour valider le mot de passe
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,18}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setErrorMessage("Le mot de passe doit contenir entre 8 et 18 caractères, une majuscule, une minuscule et un chiffre.");
            return;
        }

        setLoading(true); // Active le chargement
        try {
            const response = await axios.post("http://localhost:8080/api/users", {
                firstName,
                lastName,
                email,
                password,
                role: "CLIENT", // Assignation du rôle par défaut
            });

            if (response.data) {
                // Affichage d'une alerte de succès avec SweetAlert
                Swal.fire({
                    title: "Succès",
                    text: "Inscription réussie, vous pouvez maintenant vous connecter.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/"); // Redirection vers la page de login après l'alerte
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            setErrorMessage("Erreur lors de l'inscription. Essayez à nouveau.");
        } finally {
            setLoading(false); // Désactive le chargement
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-500">Créer un compte</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <TextField
                            label="Prénom"
                            type="text"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            variant="outlined"
                            required
                            className="rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="Nom"
                            type="text"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            variant="outlined"
                            required
                            className="rounded-lg"
                        />
                    </div>
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

                    {/* Affichage du message d'erreur lié au mot de passe */}
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="rounded-lg py-2 mt-4"
                        disabled={loading} // Désactive le bouton pendant le chargement
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "S'inscrire"}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Vous avez déjà un compte ?{" "}
                        <span
                            onClick={() => navigate("/")}
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
                            Connectez-vous
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
