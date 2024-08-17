"use client";
import { useAuthMiddleware  } from '../../lib/auth.js';
import Link from "next/link";

export default function ApiPage() {
    useAuthMiddleware();

    return (
        <div className='mt-3 ms-3 me-3'>
            <p>Api</p>
            <Link href="/dashboard">
                <p className='btn btn-primary'> Kembali</p>
            </Link>
            <ol>
                <li>
                    GET http://localhost:5000/users
                    untuk melihat data user
                </li>
                <li>
                    POST http://localhost:5000/register
                    untuk mendaftar user baru
                </li>
                <li>
                    POST http://localhost:5000/login
                    untuk login
                </li>
                <li>
                    POST http://localhost:5000/logout
                    untuk logout
                </li>
            </ol>
        </div>
    )
}
