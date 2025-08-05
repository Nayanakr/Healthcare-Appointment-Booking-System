import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary to-blue-700 text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold">Nayana Hospital</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-blue-200">
                Services
              </a>
              <a href="#" className="hover:text-blue-200">
                About Us
              </a>
              <a href="#" className="hover:text-blue-200">
                Our Doctors
              </a>
              <a href="#" className="hover:text-blue-200">
                Testimonials
              </a>
              <a href="#" className="hover:text-blue-200">
                Contact
              </a>
            </nav>
            <div>
              <Link
                to="/signin"
                className="bg-white text-primary font-medium py-2 px-4 rounded-md hover:bg-blue-50"
              >
                Dashboard Login
              </Link>
            </div>
          </div>

          <div className="py-18 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Health Is Our Top Priority
              </h1>
              <p className="mt-4 text-xl text-blue-100">
                Advanced healthcare with a personal touch. Our expert team is
                dedicated to providing exceptional medical services.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/appointments"
                  className="bg-white text-primary font-medium py-3 px-6 rounded-md hover:bg-blue-50 text-center"
                >
                  Book Appointment
                </Link>
                <a
                  href="#"
                  className="border border-white text-white font-medium py-3 px-6 rounded-md hover:bg-white hover:bg-opacity-10 text-center"
                >
                  Our Services
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://placehold.co/600x400/3498db/FFFFFF/png?text=Hospital+Image"
                alt="Hospital"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Landing;
