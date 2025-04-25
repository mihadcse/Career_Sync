
import React from 'react';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// const Card = ({ data }) => {
//   const { companyName,jobLocation,companyLogo,jobTitle, minPrice, maxPrice, salaryType, employmentType, postingDate, description } = data;

//   return (
//     <section className='card border border-cyan-300 p-4 rounded-lg shadow-lg hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500 hover:bg-gray-800 transition duration-300'>
//       <Link to={"/"} className='flex gap-4 flex-col sm:flex-row items-start'>
//         <img src={`http://localhost:3000${companyLogo}`} alt={`${companyName} logo`} className='w-20 h-20 object-contain rounded-md' />
//         <div>
//           <h4 className='text-cyan-300 mb-1 text-xl'>{companyName}</h4>
//           <h3 className='text-green-400 font-medium'>{jobTitle} ||  <span className='text-green-400 font-bold'>{salaryType}</span></h3>
//           {/* <h4 className='text-white'>{salaryType}</h4> */}
//           <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
//               <span className='flex items-center gap-2 text-white'><FiMapPin/> {jobLocation} </span>
//               <span className='flex items-center gap-2 text-white'><FiClock/> {employmentType} </span>
//               <span className='flex items-center gap-2 text-white'><span>৳</span>{maxPrice} - {minPrice} </span>
//               <span className='flex items-center gap-2 text-white'><FiCalendar/> {postingDate} </span>
//               <span className='flex items-end gap-2'></span>
//           </div>
//           <p className='text-white/90 break-words w-80 whitespace-wrap'>{description}</p>
//         </div>
//       </Link>
//     </section>
//   );
// };
const Card = ({ data }) => {
  const { company, jobLocation, jobTitle, minPrice, maxPrice, salaryType, employmentType, postingDate, description } = data;

  return (
    <section className='card border border-cyan-300 p-4 rounded-lg shadow-lg hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500 hover:bg-gray-800 transition duration-300'>
      <Link to={"/"} className='flex gap-4 flex-col sm:flex-row items-start'>
        <img src={`http://localhost:3000${company?.logoImage}`} alt={`${company?.name} logo`} className='w-20 h-20 object-contain rounded-md' />
        <div>
          <h4 className='text-cyan-300 mb-1 text-xl'>{company?.name}</h4>
          <h3 className='text-green-400 font-medium'>{jobTitle} ||  <span className='text-green-400 font-bold'>{salaryType}</span></h3>
          <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
              <span className='flex items-center gap-2 text-white'><FiMapPin/> {jobLocation} </span>
              <span className='flex items-center gap-2 text-white'><FiClock/> {employmentType} </span>
              <span className='flex items-center gap-2 text-white'><span>৳</span>{maxPrice} - {minPrice} </span>
              <span className='flex items-center gap-2 text-white'><FiCalendar/> {new Date(postingDate).toLocaleDateString()} </span>
          </div>
          <p className='text-white/90 break-words w-80 whitespace-wrap'>{description}</p>
        </div>
      </Link>
    </section>
  );
};


export default Card; 

