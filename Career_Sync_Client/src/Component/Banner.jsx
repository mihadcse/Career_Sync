
import React from 'react';
import PropTypes from 'prop-types';
import { FiMapPin, FiSearch } from 'react-icons/fi';

const Banner = ({ query, handleInputChange }) => {

    // relative max-w-screen-2xl container mx-auto xl:px-32 px-6 md:py-24 py-20 bg-cover bg-center bg-no-repeat
    return (
        <div className='relative max-w-screen-2xl container mx-auto xl:px-32 px-6 md:py-24 py-20 bg-blue-400 mt-16'>
            {/* Responsive Background Overlay */}
            <div className='absolute inset-0 bg-black opacity-30'></div>

            <div className='relative z-10 text-center'>
                <h1 className='text-3xl md:text-5xl font-bold text-white mb-3'>
                    Welcome to <span className='text-cyan-400'>Career_Sync</span>
                </h1>
                <p className='text-sm md:text-lg text-white mb-6'>
                    Discover a world of opportunities, connect with top companies, and find the career that best fits your talents.
                </p>

                <form>
                    <div className='flex justify-center md:flex-row flex-col gap-3'>

                        <div className='flex md:rounded-md rounded shadow-lg ring-1 ring-cyan-400
                                        focus-within:ring-2 focus-within:ring-cyan-400
                                        md:w-1/2 w-full bg-white/30 backdrop-blur-lg'>
                            <input type="text" name='title' id='title' placeholder='Which type of job you are looking for?'
                                className='block flex-1 border-none bg-transparent py-2 pl-8 text-white text-md font-semibold placeholder:text-gray-200 
                                        focus:outline-none sm:text-sm sm:leading-6'
                                onChange={handleInputChange} value={query} />
                            <FiSearch className='absolute mt-2.5 ml-2 text-gray-300' />
                        </div>

                        {/* <div className='flex md:rounded-md rounded shadow-lg ring-1 ring-cyan-400
                                        focus-within:ring-2 focus-within:ring-cyan-400
                                        md:w-1/3 w-full bg-white/30 backdrop-blur-lg'>
                            <input type="text" name='location' id='location' placeholder='Location?'
                                className='block flex-1 border-none bg-transparent py-2 pl-8 text-white text-md font-semibold placeholder:text-gray-200 
                                        focus:outline-none sm:text-sm sm:leading-6' />
                            <FiMapPin className='absolute mt-2.5 ml-2 text-gray-300' />
                        </div> */}

                        {/* <button type='submit' className='py-2 px-5 border border-cyan-400 rounded bg-cyan-800
                         text-white font-bold hover:bg-cyan-400 hover:border-cyan-400 transition duration-300'>Search</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};
Banner.propTypes = {
    query: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default Banner;


