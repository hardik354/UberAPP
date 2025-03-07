
import React from 'react'
import { Link } from 'react-router-dom';

const CaptainHome = () => {
  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        {/* <LiveTracking /> */}
      </div>

      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center ju'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://imgs.search.brave.com/90_91HA4BOt7m5CQWsMjGRWBWAPWi85i0wkDHORfwR4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzUzLzA3LzM2/LzM2MF9GXzg1MzA3/MzY5Ml9kd3hxSjBM/WWUzU1o3eGtFYVQ4/WEtiNXpmUzJCdnhV/di5qcGc" alt="" />
            <h4>Harsh Patel</h4>
          </div>
          <div>
            <h4>₹295.20</h4>
            <p>Earned</p>
          </div>
        </div>


        <div>
          <div className='text-center'>
            <i className=" text-2xl font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className=" text-2xl font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className=" text-2xl font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CaptainHome;
