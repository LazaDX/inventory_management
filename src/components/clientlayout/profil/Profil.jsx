import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSave } from "@fortawesome/free-solid-svg-icons";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";

function Profile() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(true);
    const [showPwd, setShowPwd] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            Swal.fire("Erreur", "Utilisateur non connecté.", "error");
            setLoading(false);
            return;
        }
        // Mesure le temps de réponse de l'appel API
        const startTime = Date.now();
        axios
            .get(`http://localhost:8080/api/users/${userId}`)
            .then((res) => {
                console.log("Temps de réponse :", Date.now() - startTime, "ms");
                setProfile(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Erreur", "Impossible de charger le profil.", "error");
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        setShowPwd((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        axios
            .put(`http://localhost:8080/api/users/${userId}`, profile)
            .then((res) => {
                setProfile(res.data);
                Swal.fire("Succès", "Profil mis à jour.", "success");
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Erreur", "Mise à jour échouée.", "error");
            });
    };

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
            <h2 className="text-center text-2xl font-semibold mb-4 text-blue-500">Mon Profil</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <TextField
                        label="Prénom"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        disabled={false}
                        className="rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Nom"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        disabled={false}
                        className="rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        disabled={false}
                        className="rounded-lg"
                    />
                </div>
                <div className="mb-4 relative">
                    <TextField
                        label="Mot de passe"
                        name="password"
                        type={showPwd ? "text" : "password"}
                        value={profile.password}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        disabled={false}
                        className="rounded-lg"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePassword} edge="end">
                                        <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="text-right">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="rounded-lg px-6 py-2"
                        endIcon={<FontAwesomeIcon icon={faSave} />}
                    >
                        Enregistrer
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
