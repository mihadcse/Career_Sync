import { useEffect, useState } from "react";
import Card from "../Component/Card";
import Banner from "../Component/Banner";
import Sidebar from "../sidebar/Sidebar";
import Jobs from "./Jobs";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  //console.log(jobs);

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
    setSelectedCategory(event.target.value);
  };

  // BUTTON FILTERRING FOR JOBS
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentpage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentpage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentpage + 1);
    }
  };

  // function for the previous page
  const prevPage = () => {
    if (currentpage > 1) {
      setCurrentPage(currentpage - 1);
    }
  };

  const FilteredData = (jobs, selected, query) => {
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
    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = FilteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-black/30 md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* MAIN CONTENT */}

        {/* LEFT cards */}
        <div className="bg-teal-300 z-10 bg-opacity-10 p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job cards */}
        <div className="col-span-2 z-10 bg-teal-800 bg-opacity-10 p-4 rounded-lg">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs </h3>
              <p>No data found</p>
            </>
          )}

          {/* Pagination */}
          {result.length > 0 ? (
            <div className="flex justify-between mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentpage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentpage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentpage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* RIGHT cards */}
        <div className="bg-teal-300 z-10 bg-opacity-10 p-4 rounded">Right</div>
      </div>
    </div>
  );
};

export default Home;
