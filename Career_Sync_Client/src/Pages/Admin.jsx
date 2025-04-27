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
            const res = await axios.get('http://localhost:3000/api/companies-pending');
            // Ensure always to get an array
            const data = Array.isArray(res.data) ? res.data : [];
            setPendingCompanies(data || []);
        } catch (error) {
            console.error('Error fetching pending companies:', error.message);
            setPendingCompanies([]); // Set empty array on error
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

    // Render pending companies if logged in
    return (
        <div className='pt-16 px-4 md:px-8 py-8'>
            <h2 className='text-3xl font-bold text-cyan-400 text-center mb-6'>Pending Companies for Approval</h2>

            {pendingCompanies.length === 0 ? (
                <p className='text-white text-center'>No companies pending approval.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingCompanies.map((company) => (
                        <div key={company._id} className="bg-black/40 border-2 border-cyan-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col items-center mb-4">
                                {company.logoImage && (
                                    <img
                                        src={`http://localhost:3000${company.logoImage}`}
                                        alt={`${company.name} logo`}
                                        className="w-24 h-24 rounded-full object-cover mb-4"
                                    />
                                )}
                                <h2 className="text-xl font-semibold text-white text-center mb-2">
                                    {company.name}
                                </h2>
                                <p className="text-cyan-400 text-center mb-1">{company.website}</p>
                                <p className="text-gray-400 text-center">{company.location}</p>
                            </div>

                            <button
                                onClick={() => handleApprove(company._id)}
                                className="mt-4 w-full bg-cyan-600 hover:bg-cyan-400 text-white font-semibold py-2 rounded transition duration-300"
                            >
                                Approve Company
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Admin