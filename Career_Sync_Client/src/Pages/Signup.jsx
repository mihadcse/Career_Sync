import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    Website: '',
    location: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let response;
      let data;

      if (userType === 'company') {
        const companyData = {
          name: formData.companyName,
          email: formData.email,
          password: formData.password,
          location: formData.location,
          website: formData.Website
        };

        const response = await fetch('http://localhost:3000/api/register-company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(companyData)
        });
      } else {
        // **Job Aspirant Registration Request**
        const aspirantData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        response = await fetch('http://localhost:3000/api/register-job-aspirant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(aspirantData),
        });
      }

      data = await response.json();
      if (response.ok) {
        setSuccessMessage('Registation successful!');
        //alert('Registation successful');

        // Redirect to home page after 2.5 seconds
        setTimeout(() => {
          navigate('/');
        }, 2500);
      } else {
        setErrorMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server.');
    }
  };


  return (
    <div className='flex items-center justify-center min-h-screen bg-black/30 px-4 mt-10'>
      <div className='bg-opacity-10 p-8 rounded-lg shadow-xl shadow-cyan-500 w-full max-w-md text-white'>
        <h2 className='text-center text-2xl font-bold mb-4'>Register</h2>

        {!userType ? (
          <div className='space-y-4'>
            <button
              className='w-full bg-cyan-800 border border-cyan-400 text-white font-bold text-lg py-2 rounded hover:bg-cyan-400 transition duration-300'
              onClick={() => setUserType('company')}>Register as Company</button>
            <button
              className='w-full bg-cyan-800 border border-cyan-400 text-white font-bold text-lg py-2 rounded hover:bg-cyan-400 transition duration-300'
              onClick={() => setUserType('professional')}>Register as Job aspirant</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4 '>
            {userType === 'company' ? (
              <>
                <div>
                  <label className='block mb-1'>Company Name</label>
                  <input type='text' name='companyName' value={formData.companyName} onChange={handleInputChange} className='w-full p-2 rounded bg-black/50 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
                </div>
                <div>
                  <label className='block mb-1'>Company Website</label>
                  <input type='url' name='companyWebsite' value={formData.companyWebsite} onChange={handleInputChange} className='w-full p-2 rounded bg-black/50 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
                </div>
                <div>
                  <label className='block mb-1'>Location</label>
                  <input type='text' name='location' value={formData.location} onChange={handleInputChange} className='w-full p-2 rounded bg-black/50 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className='block mb-1'>Full Name</label>
                  <input type='text' name='name' value={formData.name} onChange={handleInputChange} className='w-full p-2 rounded bg-black/50 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
                </div>
              </>
            )}
            <div>
              <label className='block mb-1'>Email</label>
              <input type='email' name='email' value={formData.email} onChange={handleInputChange} className='w-full p-2 rounded bg-black/50 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
            </div>
            <div>
              <label className='block mb-1'>Password</label>
              <input type='password' name='password' value={formData.password} onChange={handleInputChange} className='w-full p-2 rounded bg-black/50 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
            </div>
            {errorMessage && <p className='text-red-400 text-center'>{errorMessage}</p>}
            {successMessage && <p className='text-cyan-300 text-center'>{successMessage}</p>}
            <button type='submit' className='w-full bg-cyan-800 border border-cyan-400 text-white font-bold text-lg py-2 rounded hover:bg-cyan-400 transition duration-300'>Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
