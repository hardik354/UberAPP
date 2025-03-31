import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CapatainContext';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://imgs.search.brave.com/90_91HA4BOt7m5CQWsMjGRWBWAPWi85i0wkDHORfwR4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzUzLzA3LzM2/LzM2MF9GXzg1MzA3/MzY5Ml9kd3hxSjBM/WWUzU1o3eGtFYVQ4/WEtiNXpmUzJCdnhV/di5qcGc" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div>
                    <h4>₹295.20</h4>
                    <p>Earned</p>
                </div>
            </div>


            <div className='flex p-3 mt-8 bg-blue-100 rounded-xl justify-center gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

            </div>
        </div>
    )
}

export default CaptainDetails
