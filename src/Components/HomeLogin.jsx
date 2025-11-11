import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./Signin";

function HomeLogin() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <div id="Home" className=" min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/background-image.jpeg')] bg-cover bg-center"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navbar is rendered at the app root so it sits above the homepage overlay */}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-24 sm:pt-32 md:pt-40">
        {/* Michelin Tag */}
        <div className="mb-3 sm:mb-4">
          <h1 className="px-4 py-2 flex items-center justify-center gap-2 rounded-3xl border border-amber-400 text-amber-400 font-serif tracking-widest bg-black/30 backdrop-blur-sm animate-pulse text-xs sm:text-sm md:text-base">
            <img src="award.svg" alt="Award Icon" className="w-5 h-5 sm:w-6 sm:h-6" />
            Michelin Star Restaurant
          </h1>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-semibold tracking-wider bg-gradient-to-r from-amber-300 to-amber-600 text-transparent bg-clip-text">
          La Cuisine
        </h1>

        {/* Subtext */}
        <p className="text-amber-100 text-sm sm:text-lg md:text-xl mt-3 sm:mt-5 max-w-xs sm:max-w-md md:max-w-xl leading-relaxed">
          Join thousands of food lovers and unlock exclusive dining experiences
        </p>

        {/* Boxes */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap">
          {[
            { title: "Easy Reservations", desc: "Book your tables in seconds" },
            { title: "Loyalty Rewards", desc: "Earn points with every visit" },
            { title: "Exclusive Offers", desc: "Members-only special menu" },
          ].map((box, index) => (
            <div
              key={index}
              className="w-[280px] sm:w-[260px] md:w-[280px] lg:w-[300px] bg-black/70 px-6 py-5 rounded-xl border border-amber-200 shadow-lg backdrop-blur-sm 
              transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:border-amber-400 hover:bg-black/80"
            >
              <h1 className="text-amber-400 text-lg font-semibold">{box.title}</h1>
              <p className="text-amber-100 text-sm mt-1">{box.desc}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button onClick={()=>setShowSignUp(true)} className="px-8 py-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl text-white text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
            Create Free Account
          </button>
       
          <button onClick={()=>setShowSignIn(true)} className="px-8 py-2 bg-white text-amber-500 rounded-xl border border-amber-500 text-sm sm:text-base transition-all duration-300 hover:bg-amber-500 hover:text-white hover:scale-105">
            Sign In
          </button>
        </div>

        {/* Footer Note */}
        <h1 className="mt-5 text-gray-300 text-xs sm:text-sm mb-8">
          Free to Join. No Credit Card Required.
        </h1>
      </div>
         {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
         {showSignIn && <SignIn onClose={()=>{setShowSignIn(false)}}/>}
    </div>
  );
}

export default HomeLogin;
