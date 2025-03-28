
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

  //

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className='bg-black/30 md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* MAIN CONTENT */}

        {/* LEFT cards */}
        <div className='z-10 bg-opacity-5 p-4 rounded shadow-md shadow-cyan-500'>
          {/*  bg-teal-300 */}
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job cards */}
        <div className='col-span-2 z-10  bg-opacity-10 p-4 rounded-lg shadow-xl shadow-cyan-500'>
          {/* bg-teal-800 */}
          {
            isLoading ? (<p className='font-bold'>Loading....</p>) : result.length > 0 ? (<Jobs result={result} />) :
              <> <h3 className='text-lg font-bold mb-2'> {result.length} jobs</h3>
                <p>No data found</p> </>
          }

        </div>

        {/* RIGHT cards */}
        <div className='z-10 bg-opacity-5 p-4 rounded shadow-md shadow-cyan-500'>Right</div>
        {/* bg-teal-300  */}

      </div>

    </div>

  );
};

export default Home;