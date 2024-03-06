import React from 'react'

import { FaRegStar } from "react-icons/fa";

const HotelPreviewCard = ({ listingData }) => {
    return (
        <>
            <div className="h-[310px] md:h-[277px] overflow-hidden rounded-xl">
                <img
                    src={listingData?.photos[0]}
                    alt="Listing images"
                    className=" w-full h-[310px] md:h-[277px] object-cover object-center rounded-xl hover:scale-110 transition duration-500 ease-in-out cursor-pointer"
                />
            </div>
            <div className=" flex flex-row justify-between items-start w-full">
                {/* listings details */}
                <div className=" flex flex-col gap-1">
                    <p className="text-md text-[#222222] font-medium">
                        {listingData?.location?.city?.name},{" "}
                        {listingData?.location?.country?.name}
                    </p>
                    <p className="text-md text-[#222222] font-semibold">
                        ${listingData?.basePrice}{" "}
                        <span className=" font-normal">night</span>
                    </p>
                </div>
                {/* ratings / new status */}
                <div className=" flex flex-row gap-1 items-center">
                    {listingData?.ratings ? (
                        <>
                            <div className='flex gap-1 items-center justify-center text-white stroke-0 bg-amber-400 px-1.5 py-0.5 rounded-md'>
                                <FaRegStar size={16} className='mb-0.5' />
                                <p className="text-md">4</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <FaRegStar size={28} className='text-white stroke-0 px-1.5 py-0.5 bg-amber-400 rounded-md mr-1' />
                            <p className="text-md text-gray-500">New</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default HotelPreviewCard