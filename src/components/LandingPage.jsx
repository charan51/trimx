import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { useStoreContext } from "../contextApi";

const LandingPage = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };
  const { token } = useStoreContext();
  console.log(token);
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.3 },
    }),
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-6 lg:px-20 text-center"
        >
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-400">TrimX</span>
          </h1>
          <p className="text-lg mb-8">
            Simplify your links, share smarter, and track success.
          </p>
          <div className="flex justify-center">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#features"
              className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-md font-semibold hover:bg-gray-100 transition"
            >
              Learn More
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="/get-started"
              className="ml-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full shadow-md font-semibold hover:bg-yellow-300 transition"
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-3xl font-bold text-gray-800 mb-8"
          >
            Why Choose TrimX?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Shorten your URLs instantly with just one click.",
              },
              {
                icon: "📊",
                title: "Advanced Analytics",
                description: "Track your link performance with detailed insights.",
              },
              {
                icon: "🔒",
                title: "Secure & Reliable",
                description: "Protect your links with password and expiration options.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={featureVariants}
                className="p-6 bg-white rounded-lg shadow-lg"
              >
                <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="container mx-auto px-6 lg:px-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Simplify Your Links?
          </h2>
          <p className="mb-8">
            Join thousands of users who trust TrimX for their URL shortening
            needs.
          </p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/get-started"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full shadow-md font-semibold hover:bg-yellow-300 transition"
          >
            Get Started for Free
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-6 lg:px-20 text-center"
        >
          <a href="/" className="text-2xl font-bold text-white">
            TrimX
          </a>
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
          <p className="text-sm">
            © {new Date().getFullYear()} TrimX. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;
