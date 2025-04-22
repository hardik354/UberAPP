import React from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from '../assets/Destination.mp4';
import rideSafeLogo from '../assets/RIDESAFElogo.png';

const Start = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Video Container - 80% height */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Logo */}
        <div className="absolute">
          <img 
          />
        </div>
      </div>

      {/* Get Started Section - 20% height */}
      <div className="h-[20vh] bg-white w-full px-6">
        <div className="h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">
            Get started with RideSafe
          </h2>
          <Link 
            to='/login' 
            className="flex items-center justify-center w-full bg-black text-white py-4 rounded-xl text-lg font-semibold transition-transform active:scale-95 hover:bg-gray-900"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;