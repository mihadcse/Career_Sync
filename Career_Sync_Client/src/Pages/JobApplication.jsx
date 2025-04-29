import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobApplication = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const jobId = localStorage.getItem('jobId'); // Retrieve jobId from localStorage
        console.log("Job ID:", jobId); // Log jobId to make sure it's available
        if (!jobId) {
            setError("No job ID found in localStorage"); // Show error if no jobId
            setLoading(false);
            return;
        }

        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token'); // or wherever you stored it
                const response = await fetch(`http://localhost:3000/api/company/job-applications/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response:", errorText);
                    throw new Error(`Failed to fetch applications: ${errorText}`);
                }

                const data = await response.json();
                console.log("Fetched applications:", data);
                setApplications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        fetchApplications();
    }, []); // Empty dependency array, only runs once

    if (loading) {
        return <div className="pt-16 text-center">Loading applications...</div>;
    }

    if (error) {
        return <div className="pt-16 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="pt-16 px-4 md:px-8 py-8">
            <h1 className="text-2xl font-bold mb-6 text-white text-center mt-3">Job Applications</h1>

            {applications.length === 0 ? (
                <p className="text-gray-600">No applications found for this job.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((application) => (
                        <div key={application._id} className="bg-black/40 border-2 border-cyan-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                {application.jobAspirant.profileImage && (
                                    <img
                                        src={`http://localhost:3000${application.jobAspirant.profileImage}`}
                                        alt={`${application.jobAspirant.name} profile`}
                                        className="w-24 h-24 rounded-full object-cover mr-4"
                                    />
                                )}
                                <h2 className="text-xl font-semibold text-white">
                                    Name - <span className='text-cyan-400'>{application.jobAspirant.name}</span>
                                </h2>
                            </div>

                            {application.jobAspirant.cvImage && (
                                <div className="mt-4">
                                    <p className="text-xl font-semibold text-white">CV - </p>
                                    <a
                                        href={`http://localhost:3000${application.jobAspirant.cvImage}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <img
                                            src={`http://localhost:3000${application.jobAspirant.cvImage}`}
                                            alt={`${application.jobAspirant.name} CV`}
                                            className="w-full h-60 object-contain border rounded-md"
                                        />
                                    </a>
                                    <p className="text-sm text-gray-400 mt-2 text-center">
                                        Click on CV to view full size
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default JobApplication;
