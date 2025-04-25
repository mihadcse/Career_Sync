
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Component/Card';

const JobAspirantDashboard = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [cvImage, setCvImage] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [jobTypes, setJobTypes] = useState([]); // Types of Jobs
  const [selectedJobType, setSelectedJobType] = useState('');
  const [newJobs, setNewJobs] = useState([]);
  const [oldJobs, setOldJobs] = useState([]);
  const [preferredJobTypes, setPreferredJobTypes] = useState([]);

  const token = localStorage.getItem('token');
  // Fetch job types
  const fetchJobTypes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/job-types');
      setJobTypes(res.data);
    } catch (error) {
      console.error('Error fetching job types:', error);
    }
  };

  // Fetch preferred jobs
  const fetchPreferredJobs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/job-aspirant/matching-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { preferredJobTypes } = res.data;
      console.log("Fetched Jobs Data:", res.data);
      setNewJobs(res.data.newJobs || []);
      setOldJobs(res.data.oldJobs || []);
      setPreferredJobTypes(res.data.preferredJobTypes || []);
    } catch (error) {
      console.error('Error fetching preferred jobs:', error);
    }
  };

  // Fetch aspirant data
  const fetchAspirantData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/job-aspirant/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { name, profileImage, cvImage } = response.data;
      setName(name);
      setNewName(name);
      setProfileImage(profileImage);
      setCvImage(cvImage);
      setPreferredJobTypes(preferredJobTypes || []);
    } catch (error) {
      console.error('Failed to fetch aspirant data:', error);
    }
  };

  useEffect(() => {
    //console.log("useEffect triggered. Token:", token);
    if (token) {
      fetchAspirantData();
      fetchJobTypes();
      fetchPreferredJobs();
    }
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newName);
    if (selectedProfile) formData.append('profileImage', selectedProfile);
    if (selectedCV) formData.append('cvImage', selectedCV);

    try {
      const res = await axios.put('http://localhost:3000/api/job-aspirant/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setName(res.data.name);
      setProfileImage(res.data.profileImage);
      setCvImage(res.data.cvImage);
      alert('Profile updated successfully!');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="pt-20 px-4 md:px-24 bg-black/30 min-h-screen text-white">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Welcome, <span className="text-primary">{name || 'Aspirant'}</span>!
      </h2>
      {/*Show profile image below the greeting */}
      {profileImage && (
        <div className="mb-4">
          <img
            src={`http://localhost:3000${profileImage}`}
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
            {profileImage && (
              <img src={`http://localhost:3000${profileImage}`} alt="Profile" className="h-24 mb-2 rounded" />
            )}
            <input type="file" onChange={(e) => setSelectedProfile(e.target.files[0])} />
          </div>

          <div>
            <label className="block mb-1">CV File (Image)</label>
            {cvImage && (
              <img src={`http://localhost:3000${cvImage}`} alt="CV" className="h-24 mb-2 rounded" />
            )}
            <input type="file" onChange={(e) => setSelectedCV(e.target.files[0])} />
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
        <h3>Applied Jobs</h3>
      </div>
      <div>
        <h3 className="mt-6 mb-2">Select Preferred Job Types</h3>
        <select
          value={selectedJobType}
          onChange={(e) => setSelectedJobType(e.target.value)}
          className="text-black p-2 rounded"
        >
          <option value="">Select a job type</option>
          {jobTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
        <button
          onClick={async () => {
            if (!selectedJobType) return;
            await axios.post('http://localhost:3000/api/job-aspirant/add-preference',
              { jobType: selectedJobType },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Job type added to preferences!');
            window.location.reload(); // Reload the page to reflect changes
          }}
          className="ml-2 bg-green-500 px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl mb-4 text-cyan-400 font-semibold">Your Preferred Job Types</h3>
        {/* Showing preferred job types */}
        {console.log('Preferred job types:', preferredJobTypes)}
        {preferredJobTypes.length > 0 && (
          <div className="mt-6">
            <ul className="list-disc list-inside text-purple-300 text-lg">
              {preferredJobTypes.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
            <br />
          </div>
        )}


        <div className="mb-6">
          <h4 className="text-xl text-green-400 font-semibold mb-2">Newly Added Preferred Jobs</h4>
          <div className="grid gap-4 w-2/4">
            {newJobs.length > 0 ? (
              newJobs.map((job, index) => (
                <Card key={index} data={job} />
              ))
            ) : (
              <p className="text-white">No new jobs found.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xl text-yellow-300 font-semibold mb-2">Previously Viewed Preferred Jobs</h4>
          <div className="grid gap-4 w-2/4">
            {oldJobs.length > 0 ? (
              oldJobs.map((job, index) => (
                <Card key={index} data={job} />
              ))
            ) : (
              <p className="text-white">No previously viewed jobs found.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobAspirantDashboard;
