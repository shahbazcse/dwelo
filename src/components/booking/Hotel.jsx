import React from 'react';

import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";

const Hotel = () => {
    const newBookingData = useSelector(
        (state) => state.bookings?.newBookingData
    );

    const listingData = newBookingData.listingData;

    // listing data
    const listingSpace =
        listingData?.privacyType === "An entire place" ? "Entire" : "Shared";
    const listingType = listingData?.houseType;

    const nightStaying = newBookingData?.nightStaying;

    const basePrice =
        parseInt(nightStaying) !== 0
            ? parseInt(nightStaying) * listingData?.basePrice
            : listingData?.basePrice;

    const tax =
        basePrice !== 0
            ? Math.round((basePrice * 14) / 100)
            : Math.round((listingData?.basePrice * 14) / 100);

    const totalPrice = basePrice + tax;

    return (
        <div>
            <div className=" border border-[#dddddd] rounded-xl p-6 flex flex-col sticky top-28 min-h-[200px] bg-white">
                {/* listing data */}
                <div className=" flex flex-row gap-2">
                    {/* listing img */}
                    <img
                        src={listingData?.photos[0]}
                        alt="listing houses"
                        className=" rounded-md object-cover w-[110px] h-[96px] sm:w-[124px] sm:h-[106px]"
                    />
                    {/* title & desc */}
                    <div className=" flex flex-col justify-between">
                        <span className=" flex flex-col gap-1">
                            <p className="text-xs text-[#717171]">
                                {listingSpace} {listingType}
                            </p>
                            <p className="text-sm text-[#222222]">{listingData?.title}</p>
                        </span>
                        <span className=" text-xs text-[#222222] flex flex-row gap-1 items-center mt-2">
                            <AiFillStar size={16} />
                            {listingData?.ratings ? listingData?.ratings : "New"}
                            {listingData?.reviews && (
                                <span>
                                    <span>·</span>
                                    <span>{listingData?.reviews}</span>
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                <hr className="w-full h-[1.3px] bg-[#dddddd] my-6" />
                {/* prices */}
                <div className=" flex flex-col gap-3">
                    <h5 className=" text-[22px] text-[#222222] font-medium pb-1">
                        Your total
                    </h5>
                    <span className=" flex flex-row justify-between text-base text-[#222]">
                        {/* calculating ni  ght/day */}
                        {parseInt(nightStaying) === 0 ? (
                            <p>Per day</p>
                        ) : (
                            <p className='font-[roboto]'>Per night</p>
                        )}
                        {/* calculating price */}
                        <p className='font-[roboto] font-semibold tracking-wide'>${listingData?.basePrice}</p>
                    </span>
                    <span className=" flex flex-row justify-between text-base text-[#222]">
                        <p>Taxes <span className='font-[roboto] font-normal'>(14%)</span></p>
                        <p className='font-[roboto] font-semibold tracking-wide'>${tax}</p>
                    </span>
                </div>
                <hr className="w-full h-[1.3px] bg-[#dddddd] my-6" />
                <div className=" flex flex-row justify-between text-base text-[#222] font-medium">
                    <p>Total (USD)</p>
                    <p className='font-[roboto] font-semibold tracking-wide'>${totalPrice}</p>
                </div>
            </div>
        </div>
    );
}

export default Hotel