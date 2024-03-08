import React from 'react';

/* eslint-disable react/prop-types */
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useDateFormatting } from '../../hooks/useDateFormatting';
import PaymentMethod from './PaymentMethod';

const Payment = () => {
    const newBookingData = useSelector(
        (state) => state.bookings?.newBookingData
    );

    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessCard, setShowSuccessCard] = useState(false)

    //   geting the checkin and checkout dates
    const dateObj = {
        checkin: newBookingData.checkIn,
        checkout: newBookingData.checkOut,
    };

    //   dates
    const formattedDates = useDateFormatting(dateObj);
    //   reservation data
    const guestNumber = newBookingData.guestNumber;

    // reservation form handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsProcessing(true);

        setIsProcessing(false);
    };

    return (
        <div>
            {/* trips section */}
            <div className=" flex flex-col gap-6">
                <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
                    Your Booking
                </h5>
                {/* dates */}
                <div className=" flex flex-row justify-between">
                    <span className="text-sm md:text-base text-[#222222]">
                        <p className="font-medium">Dates</p>
                        <p>{formattedDates}</p>
                    </span>
                    {/* guests */}
                    <span className="text-sm md:text-base text-[#222222]">
                        <p className="font-medium">Guests</p>
                        <p>
                            {guestNumber} {guestNumber === "1" ? "guest" : "guests"}
                        </p>
                    </span>
                </div>
                <hr className="w-full h-[1px] bg-[#dddddd] my-4" />
                {/* payment element */}
                <form onSubmit={handleSubmit}>
                    {!showSuccessCard && (<h5 className="text-xl md:text-[22px] text-[#222222] font-medium pb-4">
                        Payment Method
                    </h5>)}
                    <PaymentMethod showSuccessCard={showSuccessCard} setShowSuccessCard={setShowSuccessCard} />
                    <hr className="w-full h-[1px] bg-[#dddddd] my-10" />
                    <div>
                        <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
                            Ground rules
                        </h5>
                        <p className="text-sm md:text-base text-[#222222] py-4">
                            We ask every guest to remember a few simple things about what
                            makes a great guest.
                        </p>
                        <ul className="text-sm space-y-3 md:text-base list-disc pl-5 text-gray-600">
                            <li><span className='font-semibold text-black'>Respect Quiet Hours:</span> Please be mindful of other guests by observing quiet hours, typically during the evening and early morning. Avoid excessive noise that may disturb others' rest and relaxation.</li>
                            <li><span className='font-semibold text-black'>No Smoking Policy:</span> For the comfort and safety of all guests, our hotel operates a strict no-smoking policy in all indoor areas. Smoking is only permitted in designated outdoor areas.</li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Payment