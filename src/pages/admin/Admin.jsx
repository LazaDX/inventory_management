import TableAdmin from "../../components/adminlayout/admins/TableAdmin";
import TitleAdmin from "../../components/adminlayout/admins/components/TitleAdmin";
import { useEffect, useState } from "react";
import { fetchAdmins } from "../../services/api";
function Admin() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const data = await fetchAdmins();
                setAdmins(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des administrateurs : ", error);
            }
        };
        getAdmins();
    }, []);

    const handleAdminAdded = (newAdmin) => {
        setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
    };

    const handleAdminUpdated = (updatedAdmin) => {
        setAdmins((prevAdmins) =>
            prevAdmins.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin))
        );
    };

    const handleAdminDeleted = (deletedAdminId) => {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== deletedAdminId));
    };
    return (
        <>
            <div className="ml-60">
                <TitleAdmin onAdminAdded={handleAdminAdded} />
                <TableAdmin
                    admins={admins}
                    onAdminUpdated={handleAdminUpdated}
                    onAdminDeleted={handleAdminDeleted}
                />
            </div>
        </>
    );
}

export default Admin;