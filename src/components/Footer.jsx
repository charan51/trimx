import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-white">
          TrimX
        </a>

        {/* Links */}
        <div className="flex justify-center space-x-6 my-4">
          <a href="/" className="hover:text-blue-400">
            Home
          </a>
          <a href="/about" className="hover:text-blue-400">
            About
          </a>
          <a href="#features" className="hover:text-blue-400">
            Features
          </a>
          <a href="/contact" className="hover:text-blue-400">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} TrimX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
