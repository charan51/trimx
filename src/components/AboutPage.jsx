import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About TrimX</h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to <span className="font-semibold">TrimX</span>, the next-gen URL shortener
          designed to simplify your digital life. At TrimX, we’re passionate
          about turning long, unwieldy links into sleek, shareable ones.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose TrimX?
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Lightning-fast URL shortening in just one click.</li>
          <li>Customizable links to reflect your brand identity.</li>
          <li>Detailed analytics to track your link performance.</li>
          <li>Robust security with password protection and expiration settings.</li>
          <li>QR code generation for easy sharing across platforms.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          At <span className="font-semibold">TrimX</span>, we aim to make sharing and tracking links
          effortless. Whether you're an individual looking to simplify your
          social media posts or a business seeking data-driven insights, TrimX
          is here to empower you.
        </p>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-500 transition duration-300"
          >
            Get Started with TrimX
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
