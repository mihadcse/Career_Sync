import { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import "../App.css"

import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import CompanyDashboard from '../Pages/CompanyDashboard';
import ProtectedRoute from './ProtectedRoute';
import JobAspirantDashboard from '../Pages/JobAspirantDashboard';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        setIsLoggedIn(!!token);
        setRole(userRole);
    }, []);

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setRole(null);
        navigate("/login");
    };

    // Navigation items based on login status
    const navItems = isLoggedIn
        ? role === "company"
            ? [{ path: "/company-dashboard", title: "Dashboard" }, { path: "/companies", title: "Companies" }]
            : [{ path: "/job-aspirant-dashboard", title: "Dashboard" }, { path: "/companies", title: "Companies" }]
        : [
            { path: "/my-job", title: "My Jobs" },
            { path: "/salary", title: "Estimated Salary" },
            { path: "/post-job", title: "Post a Job" },
        ];


    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-opacity-90 backdrop-blur-lg shadow-md">
            <nav className="container mx-auto flex items-center justify-between py-3 px-6">
                <a href="/" className='flex items-center gap-3 text-2xl text-black'>
                    <img src="./public/images/career.png" alt="" />

                    <span className='text-cyan-400 font-bold'>Career_Sync</span>
                </a>

                {/* Navbar for large Devices  */}
                <ul className='hidden md:flex gap-12'>
                    {
                        navItems.map(({ path, title }) => (
                            <li key={path} className='text-base text-white font-bold hover:text-cyan-400 transition duration-300'>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => isActive ? "active" : ""}>
                                    {title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>

                {/* Signup and Login button */}
                {/* Buttons for Authentication */}
                <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="py-2 px-5 border border-red-400 rounded bg-transparent font-bold text-white hover:bg-red-500 transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="py-2 px-5 border border-cyan-400 rounded bg-transparent font-bold text-white hover:bg-cyan-400 hover:text-white transition duration-300"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/sign-up"
                                className="py-2 px-5 border border-cyan-400 rounded bg-cyan-800 text-white font-bold hover:bg-cyan-400 transition duration-300"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className='block lg:hidden'>
                    <button onClick={handleMenuToggler}>
                        {
                            isMenuOpen ? <FaXmark className='w-5 h-5 text-white' /> : <FaBarsStaggered className='w-5 h-5 text-white' />
                        }
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`absolute top-full left-0 w-full px-4 bg-black py-5 rounded-sm z-20 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <ul>
                        {navItems.map(({ path, title }) => (
                            <li key={path} className="text-base text-center text-white py-2 font-bold hover:text-cyan-400 hover:bg-gray-800 rounded-md transition duration-300">
                                <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                                    {title}
                                </NavLink>
                            </li>
                        ))}
                        {isLoggedIn ? (
                            <li className="py-2 text-red-400 font-bold text-center hover:text-white hover:bg-red-600 rounded-md transition duration-300">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <>
                                <li className="py-2 text-white font-bold text-center hover:text-cyan-400 hover:bg-gray-800 rounded-md transition duration-300">
                                    <Link to="/login">Log in</Link>
                                </li>
                                <li className="py-2 text-cyan-400 font-bold text-center hover:text-white hover:bg-cyan-600 rounded-md transition duration-300">
                                    <Link to="/sign-up">Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

            </nav>
        </header>
    )
}

export default Navbar


