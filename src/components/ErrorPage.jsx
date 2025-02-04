import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-2xl mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-lg mb-4">
          It might have been moved or deleted. Let’s get you back on track.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md font-semibold hover:bg-blue-500 transition"
        >
          Go Home
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <img
          src="https://via.placeholder.com/400x300.png?text=Lost+in+URL+space..."
          alt="Lost in space"
          className="mt-8 rounded-lg shadow-md"
        />
      </motion.div>
    </div>
  );
};

export default ErrorPage;
