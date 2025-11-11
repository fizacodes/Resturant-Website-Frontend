import React, { useEffect } from "react";
import { useUser } from "../Components/UserContext";
import PrivateNavbar from "./PrivateNavbar";
import { useLocation, useNavigate } from "react-router-dom";

function UserDashboard() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Add a small delay to ensure the DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div id="home" className="min-h-screen relative overflow-hidden font-serif">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/background-image.jpeg')] bg-cover bg-center"></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navbar */}
      <PrivateNavbar />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 pt-36 sm:pt-40 md:pt-48 space-y-10">
        {/* Headings */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-normal leading-[1.1] bg-gradient-to-r from-amber-300 to-amber-600 text-transparent bg-clip-text">
          Fine Dining
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-yellow-50 mt-2">
          Experience
        </h2>
        <p className="text-amber-100 text-sm sm:text-lg md:text-xl mt-1 max-w-2xl leading-relaxed">
          Indulge in an unforgettable culinary journey where every dish tells a story of passion and perfection.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => navigate('/user-dashboard#reservation')}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl text-lg sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Reserve Your Table
          </button>
          <button 
            onClick={() => navigate('/user-dashboard#menu')}
            className="px-6 py-3 border border-amber-400 text-amber-400 rounded-xl text-lg sm:text-base transition-all duration-300 hover:bg-amber-500 hover:text-white hover:scale-105"
          >
            View Menu
          </button>
        </div>

        {/* Spacer to push stats to bottom */}
        <div className="flex-1"></div>

        {/* Stats Section */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-16 text-white text-center">
          <div>
            <h3 className="text-4xl font-bold">15+</h3>
            <p className="mt-1 text-lg">Years Experience</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">50+</h3>
            <p className="mt-1 text-lg">Chef Teams</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">200+</h3>
            <p className="mt-1 text-lg">Dishes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
