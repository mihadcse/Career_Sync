
import React from 'react';
import InputField from '../Component/InputField';

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2 text-gray-400'>Location</h4>

      <div>
        {/* "All" Option */}
        <label className='sidebar-label-container flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='location' value="" onChange={handleChange} />
          <span className='checkmark'></span> 
          <span className="text-gray-400 hover:text-cyan-400 transition duration-200">All</span>
        </label>

        {/* Other Locations */}
        <InputField handleChange={handleChange} value="dhaka" title="Dhaka" name="location" />
        <InputField handleChange={handleChange} value="chattogram" title="Chattogram" name="location" />
        <InputField handleChange={handleChange} value="sylhet" title="Sylhet" name="location" />
        <InputField handleChange={handleChange} value="barishal" title="Barishal" name="location" />
        <InputField handleChange={handleChange} value="mymensingh" title="Mymensingh" name="location" />
        <InputField handleChange={handleChange} value="khulna" title="Khulna" name="location" />
        <InputField handleChange={handleChange} value="rangpur" title="Rangpur" name="location" />
        <InputField handleChange={handleChange} value="rajshahi" title="Rajshahi" name="location" />

      </div>
    </div>
  );
};

export default Location;

