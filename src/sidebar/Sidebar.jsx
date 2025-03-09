// import React from 'react';
// import Location from './Location';

// const Sidebar = ({ handleChange, handleClick }) => {
//   return (
//     <div className='space-y-5 p-4 shadow rounded-lg'>
//       <h3 className='text-lg font-semibold mb-2 text-center'>Filter</h3>

//       {/* Location filter (Radio buttons, dropdown, etc.) */}
//       <Location handleChange={handleChange} />

//       {/* Example category filter buttons */}
//       <div className="space-y-2">
//         <h4 className='font-semibold'>Job Type</h4>
//         <button value="Remote" onClick={handleClick} className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
//           Remote
//         </button>
//         <button value="Onsite" onClick={handleClick} className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
//           Onsite
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import Location from './Location';
import Salary from './Salary';

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
    </>
  );
};

export default Sidebar;

