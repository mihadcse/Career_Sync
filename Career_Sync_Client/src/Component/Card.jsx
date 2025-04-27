import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Card = ({ data, isApplied }) => {
  const { company, jobLocation, jobTitle, minPrice, maxPrice, salaryType, employmentType, postingDate, description, _id } = data;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isJobApplied, setIsJobApplied] = useState(isApplied);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedJobData, setUpdatedJobData] = useState({
    jobTitle: jobTitle,
    minPrice: minPrice,
    maxPrice: maxPrice,
    salaryType: salaryType,
    jobLocation: jobLocation,
    postingDate: postingDate,
    experienceLevel: "", // you can modify this
    employmentType: employmentType,
    description: description,
  });

  const location = useLocation();
  const navigate = useNavigate();

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
        setIsJobApplied(true);
        alert('Job application submitted successfully!');
      } else {
        alert('Failed to apply for the job');
      }
    } catch (err) {
      console.error(err);
      alert('Error applying for the job');
    }
  };

  const handleRemove = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/remove-applied-job', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ jobId: data._id }),
      });

      const result = await response.json();
      if (response.ok) {
        setIsJobApplied(false);
        alert('Job application removed successfully!');
      } else {
        alert(result.message || 'Failed to remove application');
      }
    } catch (err) {
      console.error(err);
      alert('Error removing the application');
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/company/update-job/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedJobData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Job updated successfully!');
        setShowUpdateForm(false); // Hide the form
        window.location.reload();
      } else {
        alert(result.message || 'Failed to update job');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating the job');
    }
  }

  const handleDeleteJob = async () => {
    try {
      const jobId = data._id;
      const response = await fetch(`http://localhost:3000/api/company/delete-job/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert('Job deleted successfully!');
        window.location.reload(); // Reload the page to reflect changes
      } else {
        alert(result.message || 'Failed to delete job');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting the job');
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
      {/* Show Apply Button Only If Logged In as a job aspirant. Show Update and Delete button when as Company */}
      {isLoggedIn && role === "company" && location.pathname === "/company-dashboard" ? (
        // Company buttons
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setShowUpdateForm(!showUpdateForm)}
            className="w-1/2 py-2 bg-sky-600 text-white rounded-md hover:bg-cyan-900 transition duration-300"
          >
            {showUpdateForm ? "Cancel" : "Update"}
          </button>

          <button
            onClick={() => {
              if (data._id) {
                console.log(data._id);
                navigate(`/company-dashboard/applications/${data._id}`);
              } else {
                alert("Job ID is missing");
              }
            }}
            className="w-1/2 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-900 transition duration-300"
          >
            Applications
          </button>
          <button
            onClick={handleDeleteJob}
            className="w-1/2 py-2 bg-red-600 text-white rounded-md hover:bg-red-900  transition duration-300"
          >
            Delete
          </button>
        </div>
      ) : (
        // Normal user buttons
        isLoggedIn && role !== "company" && location.pathname !== "/company-dashboard" && (
          <div className="mt-4">
            {isJobApplied ? (
              <button
                onClick={handleRemove}
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={handleApply}
                className="w-full py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300"
              >
                Apply
              </button>
            )}
          </div>
        )
      )}

      {showUpdateForm && (
        <form onSubmit={handleUpdateJob} className="flex flex-col gap-2 mt-4 text-white">
          <input
            type="text"
            value={updatedJobData.jobTitle}
            onChange={(e) => setUpdatedJobData({ ...updatedJobData, jobTitle: e.target.value })}
            placeholder="Job Title"
            className="p-2 border rounded bg-black/50"
          />
          <input
            type="number"
            value={updatedJobData.minPrice}
            onChange={(e) => setUpdatedJobData({ ...updatedJobData, minPrice: e.target.value })}
            placeholder="Minimum Salary"
            className="p-2 border rounded bg-black/50"
          />
          <input
            type="number"
            value={updatedJobData.maxPrice}
            onChange={(e) => setUpdatedJobData({ ...updatedJobData, maxPrice: e.target.value })}
            placeholder="Maximum Salary"
            className="p-2 border rounded bg-black/50"
          />
          <input
            type="text"
            value={updatedJobData.salaryType}
            onChange={(e) => setUpdatedJobData({ ...updatedJobData, salaryType: e.target.value })}
            placeholder="Salary Type"
            className="p-2 border rounded bg-black/50"
          />

          {/* Location select box */}
          <select
            value={updatedJobData.jobLocation}
            onChange={(e) => setUpdatedJobData({ ...updatedJobData, jobLocation: e.target.value })}
            className="p-2 border rounded bg-black/50"
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

          {/* Date Picker for Posting Date */}
          <input
            type="date"
            value={updatedJobData.postingDate}
            onChange={(e) => setUpdatedJobData({ ...updatedJobData, postingDate: e.target.value })}
            className="p-2 border rounded bg-black/50"
          />

          <textarea
            value={updatedJobData.description}
            onChange={(e) => setUpdatedJobData({ ...updatedJobData, description: e.target.value })}
            placeholder="Description"
            className="p-2 border rounded bg-black/50"
          />
          <button type="submit" className="bg-sky-600 hover:bg-sky-900 px-4 py-2 rounded text-white m-2">
            Update
          </button>
        </form>
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

