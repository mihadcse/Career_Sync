import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
        //setErrorMessage(data.error || 'Login failed');
      }

      // Store token and role in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name); // store the name

      // Redirect based on role
      if (data.role === 'company') {
        navigate('/company-dashboard');
      } else {
        navigate('/job-aspirant-dashboard');
      }

    } catch (err) {
      setErrorMessage(err.message);
    }
    //console.log('Logging in with:', { email, password });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-black/30 px-4'>
      <div className='bg-opacity-10 p-8 rounded-lg shadow-xl shadow-cyan-500 w-full max-w-md'>
        <h2 className='text-center text-2xl font-bold mb-4 text-white'>Login</h2>
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
        <p className='text-center text-white mt-4'> Want to login as ADMIN? <span className='text-cyan-400 cursor-pointer'>Admin Login</span></p>
      </div>
    </div>
  );
};

export default Login;
