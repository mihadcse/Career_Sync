
import React from 'react';

const InputField = ({ handleChange, value, title, name }) => {
    return (
        <label className="sidebar-label-container flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                onChange={handleChange}
            />
            <span className="checkmark"></span> 
            <span className="text-gray-400 hover:text-cyan-400 transition duration-200">{title}</span> 
        </label>
    );
};

export default InputField;
