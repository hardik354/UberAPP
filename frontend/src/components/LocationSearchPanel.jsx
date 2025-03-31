import React from 'react'

const LocationSearchPanel = ({suggestions, setPickup, setDestination, activeField}) => {

    const handleLocationSelect = (location) => {
        if (activeField === 'pickup') {
            setPickup(location);
        } else if (activeField === 'destination') {
            setDestination(location);
        }
    }

    return (
        <div>
            {
                suggestions?.map((elem, index) => {
                    return <div 
                        onClick={() => handleLocationSelect(elem.description)} 
                        key={index} 
                        className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
                    >
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className='font-medium'>{elem.description}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel;
