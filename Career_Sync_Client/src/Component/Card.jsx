import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Card = ({ data }) => {
  const { company, jobLocation, jobTitle, minPrice, maxPrice, salaryType, employmentType, postingDate, description, _id } = data;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleApply = async () => {
    try {
      const jobId = data._id;
      const aspirantId = localStorage.getItem('userId');

      const response = await fetch('http://localhost:3000/api/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ jobId, aspirantId }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Job application submitted successfully!');
      } else {
        alert('Failed to apply for the job');
      }
    } catch (err) {
      console.error(err);
      alert('Error applying for the job');
    }
  };


  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsLoggedIn(!!token); // Set to true if token exists, false if not
    setRole(userRole);
  }, []);

  return (
    <section className='card border border-cyan-300 p-4 rounded-lg shadow-lg hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500 hover:bg-gray-800 transition duration-300'>
      <Link to={"/"} className='flex gap-4 flex-col sm:flex-row items-start'>
        <img src={`http://localhost:3000${company?.logoImage}`} alt={`${company?.name} logo`} className='w-20 h-20 object-contain rounded-md' />
        <div>
          <h4 className='text-cyan-300 mb-1 text-xl'>{company?.name}</h4>
          <h3 className='text-green-400 font-medium'>{jobTitle} ||  <span className='text-green-400 font-bold'>{salaryType}</span></h3>
          <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
            <span className='flex items-center gap-2 text-white'><FiMapPin /> {jobLocation} </span>
            <span className='flex items-center gap-2 text-white'><FiClock /> {employmentType} </span>
            <span className='flex items-center gap-2 text-white'><span>৳</span>{maxPrice} - {minPrice} </span>
            <span className='flex items-center gap-2 text-white'><FiCalendar /> {new Date(postingDate).toLocaleDateString()} </span>
          </div>
          <p className='text-white/90 break-words w-72 whitespace-wrap'>{description}</p>
        </div>
      </Link>
      {/* Render Apply Button Only If Logged In */}
      {isLoggedIn && role !== "company" && (
        <div className='mt-4'>
          <button
            onClick={handleApply}
            className='w-full py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300'>
            Apply
          </button>
        </div>
      )}
    </section>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.shape({
      name: PropTypes.string,
      logoImage: PropTypes.string,
    }),
    jobLocation: PropTypes.string,
    jobTitle: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    salaryType: PropTypes.string,
    employmentType: PropTypes.string,
    postingDate: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Card;

