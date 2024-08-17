// lib/auth.js
'use client'
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export const verifyToken = (context) => {
  const { req } = context;
  const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    jwt.verify(token, 'd1f5d8e1c5a0a6f4e3b2d9c8a7b6e5f4d3c2b1e6d5c4b3a2d1f4e3b2a1c6d5e4');
    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};


export const useAuthMiddleware = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }
        // const response = await axios.get('/api/protected', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   },
        // });
        // setMessage(response.data.msg);
      } catch (error) {
          setMessage('Access denied: ' + (error ).response.data.msg);
      }
    };
    fetchProtectedData();
  }, [router]);
}
