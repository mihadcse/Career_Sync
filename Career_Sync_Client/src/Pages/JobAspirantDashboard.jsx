import React, { useEffect, useState } from 'react';

const JobAspirantDashboard = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [cvImage, setCvImage] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) setName(storedName);
  }, []);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="pt-20 px-4 md:px-8 bg-black/30 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Welcome back, <span className="text-primary">{name || 'Aspirant'}</span>!
      </h2>

      {/* Profile Section */}
      <div className="bg-black/30 p-6 rounded-2xl shadow mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Profile</h3>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <input type="file" onChange={handleProfileChange} accept="image/*" className="mt-2" />
          </div>
          <div>
            <p className="text-gray-700 font-medium">Upload CV Image:</p>
            <input type="file" onChange={handleCvChange} accept="image/*" className="mt-2" />
            {cvImage && (
              <div className="mt-4">
                <img src={cvImage} alt="CV" className="w-40 h-auto rounded-md border" />
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Recommended Jobs */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-black/30 rounded-2xl shadow p-6 hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-gray-800">Frontend Developer</h4>
            <p className="text-gray-600 mt-1">Tech Corp</p>
            <p className="text-sm text-gray-500 mt-1">Remote | Full Time</p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAspirantDashboard;
