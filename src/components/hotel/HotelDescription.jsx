import React from "react";

import { amenities } from "./amenitiesApi";

const HotelDescription = ({ listingData }) => {
    return (
        <>
            <div className=" flex flex-row justify-between items-center max-h-16">
                <div className=" flex flex-col gap-1 text-[#222222]">
                    <p className=" text-sm md:text-base">
                        {listingData?.floorPlan?.guests} guests ·{" "}
                        {listingData?.floorPlan?.bedrooms} bedroom ·{" "}
                        {listingData?.floorPlan?.beds} beds ·{" "}
                        {listingData?.floorPlan?.bathroomsNumber} bath
                    </p>
                </div>
            </div>
            <hr className=" h-[1.2px] w-full bg-[#dddddd] my-8" />
            <div>
                <p className=" whitespace-pre-wrap">
                    {listingData?.description?.slice(0, 1000)}...
                </p>
            </div>

            <hr className=" h-[1.2px] w-full bg-[#dddddd] my-8" />
            <div className=" flex flex-col gap-6">
                <h2 className="text-[22px] text-[#222222] font-medium">
                    What this place offers
                </h2>
                <div className=" grid grid-cols-2 gap-x-3 md:gap-x-0 gap-y-4">
                    {amenities.map((item, i) => {
                        if (listingData?.amenities?.includes(item?.name)) {
                            return (
                                <div key={i} className=" flex flex-row gap-4 items-center">
                                    <item.svg size={26} opacity={0.8} />
                                    <p className="text-xs sm:text-sm md:text-base text-[#222222]">
                                        {item?.name}
                                    </p>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
};

export default HotelDescription;
