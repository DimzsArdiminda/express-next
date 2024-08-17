'use client';

import { useState, useEffect } from 'react';
import { useAuthMiddleware } from '../../../lib/auth.js';
import { useRouter } from 'next/navigation';

type PenggunaEdit = {
  id: number;
  name: string;
  email: string;
  gender: string;
  password: string;
  alamat: string;
  createdAt: string;
  updatedAt: string;
};

const fetchApi = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

export default function EditData({ params }: { params: { email: string } }) {
  useAuthMiddleware();
  const [userData, setUserData] = useState<PenggunaEdit | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for showing alert
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchApi(`http://localhost:5000/users-show/${params.email}`);
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => prev && { ...prev, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;
    setIsSubmitting(true);
    try {
      await fetchApi(`http://localhost:5000/users-update-email/${userData.email}`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
      });
      setShowAlert(true); // Show alert on success
      setTimeout(() => {
        setShowAlert(false); // Hide alert after a few seconds
        router.push('/dashboard/tabel-data'); // Redirect to the table data page
      }, 2000); // Adjust the delay as needed
    } catch {
      setError("Failed to update user data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : userData ? (
        <form onSubmit={handleSubmit}>
          <h2>Edit Data Pengguna</h2>
          {['name', 'gender', 'alamat', 'password'].map(field => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                name={field}
                value={userData[field as keyof PenggunaEdit] || ''}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
          ))}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              className="input input-bordered"
              disabled
            />
          </div>
          <button type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Update'}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}

      {/* Alert for success */}
      {showAlert && (
        <div className="toast">
          <div className="alert alert-success">
            <p>Data successfully updated!</p>
          </div>
        </div>
      )}
    </div>
  );
}
