// pages/logout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('http://localhost:5000/logout', { method: 'POST' });
        localStorage.removeItem('token');
        router.push('/login');
      } catch (error) {
        console.error('Logout gagal:', error);
      }
    };

    logout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default Logout;
