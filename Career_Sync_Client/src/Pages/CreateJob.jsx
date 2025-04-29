import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const token = localStorage.getItem('token');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/post-job', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Job created successfully!');
      reset();
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-black/30 px-4 pt-16'>
      <div className='bg-opacity-10 p-8 rounded-lg shadow-xl shadow-cyan-500 w-full max-w-2xl'>
        <h2 className='text-center text-2xl font-bold mb-6 text-white'>Create New Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <div>
            <input
              type="text"
              placeholder="Job Title"
              {...register('jobTitle', { required: true })}
              className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className='block mb-1'>Location</label>
            <select
              name='location'  
              {...register('jobLocation', { required: true })}
              className='w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500'
              required
            >
              <option value='' disabled>Select a location</option>
              <option value='Dhaka'>Dhaka</option>
              <option value='Chattogram'>Chattogram</option>
              <option value='Sylhet'>Sylhet</option>
              <option value='Mymensingh'>Mymensingh</option>
              <option value='Rangpur'>Rangpur</option>
              <option value='Barishal'>Barishal</option>
              <option value='Khulna'>Khulna</option>
              <option value='Rajshahi'>Rajshahi</option>
            </select>
          </div>

          <div className='flex gap-4'>
            <input
              type="number"
              placeholder="Min Salary"
              {...register('minPrice', { required: true })}
              className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="number"
              placeholder="Max Salary"
              {...register('maxPrice', { required: true })}
              className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <select
              {...register('salaryType', { required: true })}
              className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select Salary Type</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              {...register('postingDate', { required: true })}
              className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <input
            type="text"
            placeholder="Experience Level (e.g., Entry, Mid, Senior)"
            {...register('experienceLevel', { required: true })}
            className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="text"
            placeholder="Employment Type (e.g., Full-time, Part-time)"
            {...register('employmentType', { required: true })}
            className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <textarea
            placeholder="Job Description"
            {...register('description', { required: true })}
            rows={4}
            className="w-full p-2 rounded bg-black/50 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-cyan-800 border border-cyan-400 text-white font-bold text-xl py-2 rounded hover:bg-cyan-400 transition duration-300"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
