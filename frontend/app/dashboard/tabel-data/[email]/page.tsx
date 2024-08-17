'use client';

import { useState, useEffect } from 'react';
import { useAuthMiddleware } from '../../../lib/auth.js';

type PenggunaEdit = {
  id: number;
  name: string;
  email: string;
  gender: string;
  password: string;
  alamat: string;
  createdAt: string;
  updatedAt: string;
};


async function getEditData(email: string): Promise<PenggunaEdit> {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/users-show/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data: PenggunaEdit = await res.json();
  return data;
}


export default function EditData({ params }: { params: { email: string } }) {
  useAuthMiddleware();

  const [userData, setUserData] = useState<PenggunaEdit | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Email dari params:", params.email); // Cek apakah email diambil dengan benar

    async function fetchData() {
      try {
        if (params.email) {
          const data = await getEditData(params.email);
          setUserData(data);
        } else {
          setError("Email tidak ditemukan.");
        }
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, [params.email]);

  return (
    <div>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : userData ? (
        <div>
          <h2>Edit Data Pengguna</h2>
          <p>ID: {userData.id}</p>
          <p>Nama: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Gender: {userData.gender}</p>
          <p>Alamat: {userData.alamat}</p>
          <p>Created At: {new Date(userData.createdAt).toLocaleDateString()}</p>
          <p>Updated At: {new Date(userData.updatedAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

