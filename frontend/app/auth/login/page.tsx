// pages/login.tsx
'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:5000/login", {
            email,
            password,
        });
            localStorage.setItem("token", response.data.token);
            alert("Login berhasil");
            router.push("/dashboard");
        } catch (error) {
            alert("Login gagal: " + (error as any).response.data.msg);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
                <label className="label">
                <span className="label-text">Email</span>
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input input-bordered w-full"
                required
                />
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Password</span>
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered w-full"
                required
                />
            </div>
            <button type="submit" className="btn btn-primary w-full">
                Login
            </button>
            <Link href='/auth/register'>
                <p className="btn btn-secondary w-full mt-3">Register</p>
            </Link>
            </form>
        </div>
        </div>
    );
};

export default Login;
