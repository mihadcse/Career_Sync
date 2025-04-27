import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../Component/Card';

const CompanyDashboard = () => {
  const [name, setName] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [newName, setNewName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [createdJobs, setCreatedJobs] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch Created jobs
  const fetchCreatedJobs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/company/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { createdJobs } = res.data;
      console.log("Fetched Jobs Data:", res.data);
      setCreatedJobs(res.data.createdJobs || []);
    } catch (error) {
      console.error('Error fetching preferred jobs:', error);
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/company/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, logoImage, isApproved } = response.data;
        setName(name);
        setNewName(name);
        setLogoImage(logoImage);
        setCompanyId(localStorage.getItem('userId'));
        setIsApproved(isApproved); // Set the isApproved state
      } catch (error) {
        console.error('Failed to fetch aspirant data:', error);
      }
    };

    fetchCompany();
    //fetchCreatedJobs();
  }, [token]);

  useEffect(() => {
    if (companyId) {
      fetchCreatedJobs();
    }
  }, [companyId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newName);
    if (selectedProfile) formData.append('logoImage', selectedProfile);

    try {
      const res = await axios.put('http://localhost:3000/api/company/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setName(res.data.name);
      setLogoImage(res.data.logoImage);
      alert('Profile updated successfully!');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };


  return (
    <div className="pt-20 px-4 md:px-24 bg-black/30 min-h-screen text-white">
      <h1 className="text-4xl font-semibold mb-2 text-center">Company Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-2 text-center">Approval State - 
        <span className={isApproved ? 'text-green-400' : 'text-red-400'}>
          {isApproved ? ' Approved' : ' Not Approved'}
        </span>
      </h2>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Welcome, <span className="text-primary">{name || 'Aspirant'}</span>!
      </h2>
      {/*Show profile image below the greeting */}
      {logoImage && (
        <div className="mb-4">
          <img
            src={`http://localhost:3000${logoImage}`}
            alt="Profile"
            className="h-52 w-42 rounded-full object-cover border-2 border-white"
          />
        </div>
      )}
      {/* toggle between update button and form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-dark px-4 py-2 rounded text-white"
        >
          Update Profile
        </button>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-6 max-w-md">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Profile Image</label>
            {logoImage && (
              <img src={`http://localhost:3000${logoImage}`} alt="Profile" className="h-24 mb-2 rounded" />
            )}
            <input type="file" onChange={(e) => setSelectedProfile(e.target.files[0])} />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark px-4 py-2 rounded text-white m-2"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-red-500 hover:bg-primary-dark px-4 py-2 rounded text-white m-2"
          >
            Cancel
          </button>
          <br />
          <br />
        </form>
      )}
      <br />
      <br />
      <div>
        <h3 className="text-3xl m-4 text-cyan-400 font-semibold">Created Jobs</h3>
        {/* Showing preferred job types */}
        {createdJobs.length > 0 && (
          <div className="grid gap-4 w-8/12">
            {createdJobs.length > 0 ? (
              createdJobs.map((job, index) => (
                <Card key={index} data={job} />
              ))
            ) : (
              <p className="text-white">You haven’t applied to any jobs yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyDashboard