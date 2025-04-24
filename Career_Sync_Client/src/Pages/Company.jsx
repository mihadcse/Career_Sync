import React, { useEffect, useState } from 'react'

const Company = () => {

    const [companies, setCompanies] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // Fetching from MongoDB 
    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/api/company")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data);  // Set the fetched companies into the state
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching companies:", error);
                setIsLoading(false); // Handle loading state even on error
            });
    }, []);
    return (
        <div className="pt-16 bg-black/30 min-h-screen">
            <div className="text-white py-16 text-center">
                <h1 className="text-4xl font-bold text-cyan-400">Registered Companies</h1>
                <p className="text-lg text-gray-300 mt-2">Explore our partnered companies</p>
            </div>

            {isLoading ? (
                <p className="text-white text-center text-xl font-bold">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
                    {companies.map((company, index) => (
                        <div key={index} className="bg-opacity-10 p-6 rounded-lg shadow-xl shadow-cyan-500 text-center text-white border-2 border-cyan-500">
                            <h2 className="text-2xl font-bold">{company.name}</h2>
                            <p className="text-lg text-gray-300">
                                {company.jobCount !== undefined ? `${company.jobCount} Jobs Offered` : "Job count not available"}
                            </p>
                            <p className="text-sm text-gray-400">{company.location || "Location not available"}</p>
                        </div>
                    ))}
                </div>
            )}
            <br />
            <br />
        </div>
    )
}

export default Company