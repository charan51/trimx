import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStoreContext } from "../contextApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useStoreContext(); // Token from context
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      const expiryTime = tokenPayload.exp * 1000;
      const currentTime = Date.now();

      if (expiryTime <= currentTime) {
        handleLogout();
      } else {
        const timeout = setTimeout(handleLogout, expiryTime - currentTime);
        return () => clearTimeout(timeout);
      }
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">TrimX</a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navbar Links */}
        <div className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:space-x-6`}>
          <a href="/" className="block mt-4 lg:mt-0 hover:text-yellow-300">Home</a>

          {!token ? (
            <>
              <a href="/#features" className="block mt-4 lg:mt-0 hover:text-yellow-300">Features</a>
              <a href="/about" className="block mt-4 lg:mt-0 hover:text-yellow-300">About</a>
            </>
          ) : (
            <>
              <a href="/dashboard" className="block mt-4 lg:mt-0 hover:text-yellow-300">Dashboard</a>
              <a href="/createurl" className="block mt-4 lg:mt-0 hover:text-yellow-300">Create Link</a>
            </>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="block mt-4 lg:mt-0 bg-red-500 text-white px-4 py-2 rounded-full shadow-md font-semibold hover:bg-red-400 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="/login"
                className="block mt-4 lg:mt-0 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full shadow-md font-semibold hover:bg-yellow-300 transition"
              >
                Login
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="/signup"
                className="block mt-4 lg:mt-0 bg-white text-blue-600 px-4 py-2 rounded-full shadow-md font-semibold hover:bg-gray-100 transition"
              >
                Sign Up
              </motion.a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
