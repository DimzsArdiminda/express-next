import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
    gender: string;
    password: string;
    alamat: string;
    createdAt: string;
    updatedAt: string;
};

export default function DeleteHandler({ pengguna }: { pengguna: User }) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const getToken = localStorage.getItem('token');
    const router = useRouter();

    function handleModal() {
        setModal(!modal);
    }

    async function handleDelete(iduser: number) {
        setIsMutating(true);
        try {
            const response = await fetch(`http://localhost:5000/users-delete/${iduser}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the user');
            }

            router.refresh();
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setIsMutating(false);
            setModal(false);
        }
    }

    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModal}>Delete</button>

            {modal && (
                <>
                    <input type="checkbox" checked={modal} onChange={handleModal} className="modal-toggle" />
                    <div className="modal" style={{ backgroundColor: "white" }}>
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Are you sure you want to delete {pengguna.email}?</h3>
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={handleModal}>Close</button>
                                {!isMutating ? (
                                    <button type="submit" className="btn btn-primary" onClick={() => handleDelete(pengguna.id)}>Delete</button>
                                ) : (
                                    <button type="button" className="btn loading">Saving...</button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
