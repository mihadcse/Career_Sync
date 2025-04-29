
import React from 'react';
import Location from './Location';
import Salary from './Salary';
import JobPostingData from './JobPostingData';

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <>
    <div className="space-y-5 p-4 shadow-md rounded-xl shadow-cyan-500">
      <h3 className="text-lg font-semibold mb-2 text-center text-cyan-400">Filter</h3>

      {/* Location filter (Radio buttons, dropdown, etc.) */}
      <Location handleChange={handleChange} />     
    </div>

    <div className="space-y-5 p-4 shadow-md rounded-xl shadow-cyan-500">
      <Salary handleChange={handleChange} handleClick={handleClick} />
    </div>
    <div className="space-y-5 p-4 shadow-md rounded-xl shadow-cyan-500">
    <JobPostingData handleChange={handleChange} />
    </div>
    </>
  );
};

export default Sidebar;

