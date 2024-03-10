import React from "react";

import { IoStar } from "react-icons/io5";

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
                <div className=" flex flex-row gap-1 items-center">
                    {listingData?.ratings ? (
                        <>
                            <div className="flex gap-1 items-center justify-center stroke-0 bg-amber-100  px-1.5 py-0.5 rounded-md">
                                <IoStar size={18} className="mb-0.5 fill-amber-400" />
                                <p className="text-md text-black mt-0.5">
                                    {listingData?.ratings}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-1 items-center justify-center stroke-0 bg-amber-100  px-1.5 py-0.5 rounded-md">
                                <IoStar size={18} className="mb-0.5 fill-amber-400" />
                                <p className="text-md text-black mt-0.5">New</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default HotelPreviewCard;
