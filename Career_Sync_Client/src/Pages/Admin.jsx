import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pendingCompanies, setPendingCompanies] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        // Get admin credentials from environment variables
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        try {
            if (email === adminEmail && password === adminPassword) {
                // Admin login successful
                alert('Admin logged in successfully!');
                setIsLoggedIn(true); // Set the logged-in state to true
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchPendingCompanies();
        }
    }, [isLoggedIn]);

    const fetchPendingCompanies = async () => {
        try {
            const res = await axios.get('/api/companies-pending');
            setPendingCompanies(res.data);
        } catch (error) {
            console.error('Error fetching pending companies:', error.message);
        }
    };

    const handleApprove = async (companyId) => {
        try {
            await axios.put(`/api/approve-company/${companyId}`);
            alert('Company approved successfully!');
            // Refresh the list
            fetchPendingCompanies();
        } catch (error) {
            console.error('Error approving company:', error.message);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-black/30 px-4'>
                <div className='bg-opacity-10 p-8 rounded-lg shadow-xl shadow-cyan-500 w-full max-w-md'>
                    <h2 className=' text-center text-2xl font-semibold text-white'>Admin Login</h2>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-white mb-1'>Email</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-white mb-1'>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500'
                                required
                            />
                        </div>
                        {errorMessage && <p className='text-red-400 text-center'>{errorMessage}</p>}
                        <button
                            type='submit'
                            className='w-full bg-cyan-800 border border-cyan-400 text-white font-bold text-xl py-2 rounded hover:bg-cyan-400 transition duration-300'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className='pt-20 text-center'>
            <h2 className='text-3xl font-semibold text-cyan-400 mb-6'>Pending Companies for Approval</h2>
            {pendingCompanies.length === 0 ? (
                <p className='text-white'>No companies pending approval.</p>
            ) : (
                <div className='space-y-4'>
                    {pendingCompanies.map((company) => (
                        <div key={company._id} className='bg-black/50 p-4 rounded border border-cyan-500'>
                            <h3 className='text-white text-xl'>{company.name}</h3>
                            <p className='text-gray-400'>{company.email}</p>
                            <button
                                onClick={() => handleApprove(company._id)}
                                className='mt-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded'>
                                Approve
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Admin