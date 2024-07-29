import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    return jwt.verify(token, 'e9b8c9f93a7e9b8c9f93a7e9b8c9f93a7e9b8c9f93a7e9b8c9f93a7e9b8c9f93a7');
  } catch (error) {
    throw new Error('Invalid token');
  }
};
