import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import AddAdminModal from '../AddAdminModal';
import EditAdminModal from '../EditAdminModal';
function TitleAdmin({ onAdminAdded }) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const handleAddClick = () => {
        setOpenAddModal(true);
    };
    const handleAddClose = () => {
        setOpenAddModal(false);
    };

    return (
        <>
            <div className="p-4 mb-2 rounded-md shadow-md items-center justify-between flex bg-white">
                <h1 className="font-semibold text-slate-500">Liste des administrateurs</h1>
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center hover:bg-blue-700"
                    onClick={handleAddClick}
                >
                    <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
                    Ajouter
                </button>
            </div>
            {openAddModal && (
                <AddAdminModal onClose={handleAddClose} onAdminAdded={onAdminAdded} />
            )}
        </>
    );
}
export default TitleAdmin;