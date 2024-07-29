// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware untuk memverifikasi token JWT
export const verifyToken = (req, res, next) => {
    // Ambil header otorisasi dari permintaan
    const authHeader = req.headers['authorization'];
    // Pastikan token berada dalam format "Bearer token"
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        // Token tidak ada
        return res.status(401).json({ msg: 'Tidak ada token, otorisasi ditolak' });
    }

    try {
        // Verifikasi token menggunakan secret key
        const decoded = jwt.verify(token, 'd1f5d8e1c5a0a6f4e3b2d9c8a7b6e5f4d3c2b1e6d5c4b3a2d1f4e3b2a1c6d5e4');
        req.user = decoded; // Simpan payload token ke objek request
        next(); // Lanjutkan ke middleware atau route berikutnya
    } catch (error) {
        // Token tidak valid atau kadaluarsa
        res.status(403).json({ msg: 'Token tidak valid' });
    }
};
