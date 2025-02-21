// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types';

const LocationSearchPanel = (props) => {

    // sample location array
    const locations = [
        "24B, Near Kapo&apos;s cafe, Sheriyans Coding School, Bhopal",
        "22C, Near Kapoor&apos;s cafe, Sheriyans Coding School, Bhopal",
        "2W, Near  cafe, Sheriyans Coding School, Bhopal",
        "2B, Near Kapoor&apos;s house , Sheriyans Coding School, Bhopal",
    ]

    return (
        <div>
            {/* this is a sample data */}
            {
                locations.map(function (elem, index) {
                    return <div onClick={
                        () => {
                            props.setVehiclePanel(true);
                            props.setPanelOpen(false);
                        }} key={index} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }

        </div>
    )
}
LocationSearchPanel.propTypes = {
    setVehiclePanel: PropTypes.func.isRequired,
    setPanelOpen: PropTypes.func.isRequired,
};

export default LocationSearchPanel;
