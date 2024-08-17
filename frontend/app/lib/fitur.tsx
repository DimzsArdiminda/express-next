'use client';

import { useRouter } from 'next/navigation';

// Fungsi handleLogout yang reusable
export const handleLogout = async (router: any) => {
    try {
      await fetch('http://localhost:5000/logout', { method: 'POST' });
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  };
  

// Fungsi getGreeting yang reusable
export const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat pagi';
    if (hour < 18) return 'Selamat siang';
    return 'Selamat malam';
  };
  