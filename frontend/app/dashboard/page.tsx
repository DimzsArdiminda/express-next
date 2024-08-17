// pages/dashboard/page.tsx
'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {jwtDecode } from 'jwt-decode';
import { getGreeting, handleLogout } from "../lib/fitur";

const Protected = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }
        const decoded: { email: string } = jwtDecode(token); // Dekode token untuk mendapatkan email
        setEmail(decoded.email);

        // const response = await axios.get('/api/protected', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   },
        // });
        // setMessage(response.data.msg);
      } catch (error) {
        setMessage('Access denied: ' + (error as any).response.data.msg);
      }
    };
    fetchProtectedData();
  }, [router]);



  return (
    <>
     <header className="bg-slate-700 p-5">
        <div className="container mx-auto">
          <h1 className="text-white text-center font-semibold text-2xl">
            {getGreeting()} {email}! Pilih menu di bawah ini untuk navigasi ke halaman yang anda inginkan
          </h1>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-2">
          <Link href="/dashboard/tabel-data">
            <p className="flex items-center justify-center p-3 bg-blue-500 max-w-xs text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
              <span className="text-base font-semibold">Tabel Data</span>
            </p>
          </Link>
          <Link href="/dashboard/api">
            <p className="flex items-center justify-center p-3 max-w-xs bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out">
              <span className="text-base font-semibold">Halaman Lain</span>
            </p>
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-secondary mt-4"
            >
            Logout
          </button>
          </div>
      </main>
    </>
  );
};

export default Protected;
