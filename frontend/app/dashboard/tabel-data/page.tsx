"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

type Pengguna = {
    id: number;
    name: string;
    email: string;
    gender: string;
    password: string;
    alamat: string;
    createdAt: string;
    updatedAt: string;
};

async function getUser(token: string) {
    const res = await fetch("http://localhost:5000/users", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
}

export default function Tabel() {
    const [users, setUsers] = useState<Pengguna[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token') as string;
        
        if (!token) {
            setIsAuthenticated(false);
            router.push('/');
            return;
        }

        async function fetchData() {
            try {
                const data = await getUser(token);
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                // Optional: Handle error, e.g., redirect to login
                router.push('/');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner if preferred
    }

    return (
        <div className="container   p-4">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent">
                    </div>
                </div>
            ) : (
                <table className="table-auto w-full border-collapse table-xs ">
                    <thead className="bg-gray-200 text-gray-600">
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Gender</th>
                            <th className="border px-4 py-2">Password</th>
                            <th className="border px-4 py-2">Alamat</th>
                            <th className="border px-4 py-2">Created At</th>
                            <th className="border px-4 py-2">Updated At</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                        {users.map((data, index) => (
                            <tr key={data.id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{data.name}</td>
                                <td className="border px-4 py-2">{data.email}</td>
                                <td className="border px-4 py-2">{data.gender}</td>
                                <td className="border px-4 py-2">{data.password}</td>
                                <td className="border px-4 py-2">{data.alamat}</td>
                                <td className="border px-4 py-2">{new Date(data.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{new Date(data.updatedAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/dashboard/tabel-data/${data.email}`} className="btn btn-warning h-4">
                                        Edit
                                    </Link>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
