"use client";

import { useAuthMiddleware } from '@/app/lib/auth';
import React, { useState, useEffect } from 'react';
import {jwtDecode } from 'jwt-decode';


type UserData = {
  id: number;
  name: string;
  email: string;
  gender: string;
  password: string;
  alamat: string;
  createdAt: string;
  updatedAt: string;
};

const getUser = async (email: string): Promise<UserData | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const resp = await fetch(`http://localhost:5000/users-show/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!resp.ok) throw new Error(resp.statusText);

    return resp.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Page() {
  useAuthMiddleware();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const decoded: { email: string } = jwtDecode(token); // Decode token
        const email = decoded?.email; // Extract email from token

        if (!email) {
          setError('Email not found in token');
          return;
        }

        const data = await getUser(email); // Fetch user data
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

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
          <p>Password: {userData.password}</p>
          <p>Created At: {new Date(userData.createdAt).toLocaleDateString()}</p>
          <p>Updated At: {new Date(userData.updatedAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
