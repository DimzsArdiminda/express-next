"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type FormData = {
    name: string;
    email: string;
    password: string;
    alamat: string;
    gender: string;
};

export default function Register() {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '', alamat: '', gender: '' });
    const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>({});
    const [backendError, setBackendError] = useState<string | null>(null); 
    const route = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: { [key in keyof FormData]?: string } = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setBackendError(null); // Reset error sebelum pengiriman
            await axios.post("http://localhost:5000/register", formData);
            // Handle sukses, seperti menavigasi ke halaman lain
            alert('registrasi berhasil')
            route.push('/')
        } catch (error: any) {
            if (error.response && error.response.data) {
                setBackendError(error.response.data.error || "An error occurred");
            } else {
                setBackendError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card w-96">
                <div className="card-body">
                    <form onSubmit={submitData}>
                        {backendError && <p className="text-red-500">{backendError}</p>} {/* Tampilkan error dari backend */}
                        {['name', 'email', 'password', 'alamat'].map(field => (
                            <div key={field} className="form-control">
                                <label className="label">
                                    <span className="label-text">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                                </label>
                                <input
                                    type={field === 'password' ? 'password' : 'text'} // Set tipe input untuk password
                                    name={field}
                                    value={formData[field as keyof FormData]}
                                    onChange={handleChange}
                                    placeholder={field}
                                    className="input input-bordered w-full"
                                    required
                                />
                                {errors[field as keyof FormData] && <p className="text-red-500">{errors[field as keyof FormData]}</p>}
                            </div>
                        ))}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <div className="flex space-x-4">
                                {['pria', 'wanita'].map(g => (
                                    <label key={g}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={g}
                                            checked={formData.gender === g}
                                            onChange={handleChange}
                                            className="radio"
                                            required
                                        />
                                        {g.charAt(0).toUpperCase() + g.slice(1)}
                                    </label>
                                ))}
                            </div>
                            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                        </div>
                        <div className="card-actions justify-center mt-4">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
