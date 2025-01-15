// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="bg-[url('/src/assets/UBER.png')] bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full">
      <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt=''/>
      <div className="bg-white pb-8 py-4 px-4">
        <h2 className="text-[30px] font-semibold">Get Started with Uber</h2>
        <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5">Continue</Link>
      </div>
    </div>
  );
}

export default Start;
