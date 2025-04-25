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
    <div className='max-w-screen-2xl mx-auto container xl:px-24 px-4 pt-16 text-white'>
      <div className='bg-cyan-500 py-10 px-4 lg:px-16 rounded shadow-lg'>
        <h2 className='text-2xl font-bold mb-6'>Create New Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" placeholder="Job Title" {...register('jobTitle', { required: true })} className="w-full p-2 text-black rounded" />
          <input type="text" placeholder="Job Location" {...register('jobLocation', { required: true })} className="w-full p-2 text-black rounded" />
          <input type="number" placeholder="Min Salary" {...register('minPrice', { required: true })} className="w-full p-2 text-black rounded" />
          <input type="number" placeholder="Max Salary" {...register('maxPrice', { required: true })} className="w-full p-2 text-black rounded" />

          <select {...register('salaryType', { required: true })} className="w-full p-2 text-black rounded">
            <option value="">Select Salary Type</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          <input type="date" {...register('postingDate', { required: true })} className="w-full p-2 text-black rounded" />
          <input type="text" placeholder="Experience Level (e.g., Entry, Mid, Senior)" {...register('experienceLevel', { required: true })} className="w-full p-2 text-black rounded" />
          <input type="text" placeholder="Employment Type (e.g., Full-time, Part-time)" {...register('employmentType', { required: true })} className="w-full p-2 text-black rounded" />

          <textarea placeholder="Job Description" {...register('description', { required: true })} className="w-full p-2 text-black rounded" rows={5}></textarea>

          <button type="submit" className="bg-black hover:bg-gray-800 px-6 py-2 text-white font-semibold rounded">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
