import { useEffect, useState } from "react";

const Statistics = () => {
    const [stats, setStats] = useState({
        totalJobaspirants: 0,
        totalCompany: 0,
        totalJobs: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/statistics") 
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching statistics:", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="pt-16 bg-black/30 min-h-screen">
            {/* Page Title */}
            <div className=" text-white py-16 text-center">
                <h1 className="text-4xl font-bold text-cyan-400">Platform Statistics</h1>
                <p className="text-lg text-gray-300 mt-2">A snapshot of our growing platform</p>
            </div>

            {/* Statistics Grid */}
            <div className="flex justify-center gap-8">
                {/* Stat Cards */}
                {isLoading ? (
                    <p className="text-white text-center text-xl font-bold col-span-3">Loading...</p>
                ) : (
                    <>
                        <div className="bg-opacity-10 p-6 rounded-lg shadow-xl shadow-cyan-500 text-center text-white">
                            <h2 className="text-4xl font-bold">{stats.totalJobaspirants}</h2>
                            <p className="text-lg">Total Job Aspirants</p>
                        </div>

                        <div className="bg-opacity-10 p-6 rounded-lg shadow-xl shadow-cyan-500 text-center text-white">
                            <h2 className="text-4xl font-bold">{stats.totalCompany}</h2>
                            <p className="text-lg">Registered Companies</p>
                        </div>

                        <div className="bg-opacity-10 p-6 rounded-lg shadow-xl shadow-cyan-500 text-center text-white">
                            <h2 className="text-4xl font-bold">{stats.totalJobs}</h2>
                            <p className="text-lg">Total Job Listings</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Statistics;
