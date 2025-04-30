import { useEffect, useState } from "react";
import Card from "../Component/Card";
import Banner from "../Component/Banner";
import Sidebar from "../sidebar/Sidebar";
import Jobs from "./Jobs";
import NewsLetter from "../Component/NewsLetter";
import JobPostingData from "../sidebar/JobPostingData";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [postingDate, setPostingDate] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetching from json file
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("jobs.json").then(res => res.json()).then((data) => {
  //     setJobs(data);
  //     setIsLoading(false);
  //   }).catch((error) => console.error("Error fetching jobs:", error));
  // }, []);

  // Fetching from MongoDB
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data); // Set the fetched jobs into the state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false); // Handle loading state even on error
      });
  }, []);

  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    console.log("Input changed:", event.target.value);
    setQuery(event.target.value);
  };

  //Filter jobs for title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // RADIO BUTTON FILTERRING FOR JOBS
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postingDate") {
      setPostingDate(value);
    } else {
      setSelectedCategory(value);
    }
  };

  // BUTTON FILTERRING FOR JOBS
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const FilteredData = (jobs, selected, query, postingDate) => {
    let filteredJobs = jobs;

    // Filter by search query
    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by selected category (e.g., location)
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation }) => {
        return jobLocation.toLowerCase() === selected.toLowerCase();
      });
    }

    if (postingDate) {
      const now = new Date();

      filteredJobs = filteredJobs.filter(({ datePosted }) => {
        const postedDate = new Date(datePosted);

        if (postingDate === "last24hours") {
          return now - postedDate <= 24 * 60 * 60 * 1000;
        } else if (postingDate === "last7days") {
          return now - postedDate <= 7 * 24 * 60 * 60 * 1000;
        } else if (postingDate === "last30days") {
          return now - postedDate <= 30 * 24 * 60 * 60 * 1000;
        }
        return true; // for 'All Time'
      });
    }

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = FilteredData(jobs, selectedCategory, query, postingDate);

  //

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-black/30 md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* MAIN CONTENT */}

        {/* LEFT cards */}
        <div className="z-10 bg-opacity-5 p-4 rounded shadow-md shadow-cyan-500">
          {/*  bg-teal-300 */}
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job cards */}
        <div className="col-span-2 z-10  bg-opacity-10 p-4 rounded-lg shadow-xl shadow-cyan-500">
          {/* bg-teal-800 */}
          {isLoading ? (
            <p className="font-bold">Loading....</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              {" "}
              <h3 className="text-lg font-bold mb-2"> {result.length} jobs</h3>
              <p>No data found</p>{" "}
            </>
          )}
        </div>

        {/* RIGHT cards */}
        <div className="z-10 bg-opacity-5 p-4 rounded shadow-md shadow-cyan-500">
          <NewsLetter />
        </div>
        {/* bg-teal-300  */}
      </div>
    </div>
  );
};

export default Home;
