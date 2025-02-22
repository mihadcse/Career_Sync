
import { useEffect, useState } from 'react';
import Card from '../Component/Card';
import Banner from '../Component/Banner';
import Sidebar from '../sidebar/Sidebar';
import Jobs from './Jobs';


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json").then(res => res.json()).then((data) => {
      setJobs(data);
      setIsLoading(false);
    }).catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  //console.log(jobs);

  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    console.log('Input changed:', event.target.value);
    setQuery(event.target.value);
  };

  //Filter jobs for title
  const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  // RADIO BUTTON FILTERRING FOR JOBS
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  // BUTTON FILTERRING FOR JOBS
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  }

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

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };



  const result = FilteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className='bg-black/30 md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* MAIN CONTENT */}

        {/* LEFT cards */}
        <div className='bg-teal-300 z-10 bg-opacity-10 p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job cards */}
        <div className='col-span-2 z-10 bg-teal-800 bg-opacity-10 p-4 rounded-lg'>
          {

          }
          <Jobs result={result} />
        </div>

        {/* RIGHT cards */}
        <div className='bg-teal-300 z-10 bg-opacity-10 p-4 rounded'>Right</div>

      </div>

    </div>

  );
};

export default Home;