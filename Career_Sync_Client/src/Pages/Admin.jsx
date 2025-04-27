import React, { useState } from 'react'

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        // Get admin credentials from environment variables
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        try {
            // Check if entered email and password match the admin credentials
            if (email === adminEmail && password === adminPassword) {
                // Admin login successful
                alert('Admin logged in successfully!');
                // You can redirect or perform other actions here
                // For example, redirect to the admin dashboard:
                // window.location.href = '/admin-dashboard';
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (err) {
            setErrorMessage(err.message);
        }
        
    };

    return (
        <div>
            <div className='pt-20 text-center text-3xl font-semibold text-cyan-400'>Admin Dashboard</div>
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
    )
}

export default Admin