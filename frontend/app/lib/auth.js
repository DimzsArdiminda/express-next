// lib/auth.js
import jwt from 'jsonwebtoken';

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
