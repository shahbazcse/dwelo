import React from 'react';

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { newBooking } from "../../redux/actions/bookingActions";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const DatePicker = ({ listingData }) => {
    // refs
    const calendarRef = useRef();
    const dropdownRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handling outside click
    const { state: calendarState, setState: setCalendarState } =
        useOutsideClick(calendarRef);
    const { state: showDropdown, setState: setShowDropdown } =
        useOutsideClick(dropdownRef);

    // guests state is here
    const [guestsNumber, setGuestsNumber] = useState(1);
    const [childrenNumber, setChildrenNumber] = useState(0);

    // dates saving and showing to the dateRange calendar calculation here
    const [selectedDates, setSelectedDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    // formatted dates to save in the db
    const formattedStartDate = selectedDates[0]?.startDate?.toISOString();
    const formattedEndDate = selectedDates[0]?.endDate?.toISOString();

    // local dates from fromatted date to show in the ui
    const localStartDate = new Date(formattedStartDate).toLocaleDateString();
    const localEndDate = new Date(formattedEndDate).toLocaleDateString();

    // Function to handle date selection
    const handleSelect = (ranges) => {
        setSelectedDates([ranges.selection]);
    };

    const calculateBooking = () => {
        const daysInMiliSec = Math.ceil(
            selectedDates?.[0]?.endDate - selectedDates?.[0]?.startDate
        );

        // turning miliseconds into days
        const calculatedNights = daysInMiliSec / (1000 * 60 * 60 * 24);
        const finalNights = calculatedNights === 0 ? 1 : calculatedNights;
        const calculatedBasePrice = listingData?.basePrice * finalNights;

        return { calculatedBasePrice, calculatedNights }
    }

    // handle booking
    const handleBooking = () => {
        const { calculatedBasePrice, calculatedNights } = calculateBooking();
        const data = {
            listingData,
            formattedStartDate,
            formattedEndDate,
            nightsStaying: calculatedNights,
            totalGuest: guestsNumber + childrenNumber,
            bookingBasePrice: calculatedBasePrice,
        };
        // handle booking API here
        dispatch(newBooking(data));
        navigate("/booking");
        /*
        Move booking data to /booking
        Make payment and confirm booking
        On confirmation, show confirmation card,
        Include dashboard link in confirmation card
        */
    };

    useEffect(() => {
        (async () => {
            // handle data persistence
        })();
    }, [listingData?._id]);

    return (
        <>
            <div className="font-[roboto] w-full min-h-[315px] rounded-xl border border-[#dddddd] sticky top-32 shadow-customShadow p-6">
                <div className=" flex felx-row justify-between items-start">
                    <div className=" flex flex-col">
                        <h3 className="tracking-wider text-[22px] text-[#222222] font-semibold">
                            ${listingData?.basePrice}<span className='text-gray-500 text-sm'> / Night</span>
                        </h3>
                    </div>
                    <span className=" text-sm text-[#222222] flex flex-row gap-1 items-center mt-2">
                        <AiFillStar size={18} />
                        {listingData?.ratings ? listingData?.ratings : "New"}
                        {listingData?.reviews && (
                            <span>
                                <span>·</span>
                                <span>{listingData?.reviews}</span>
                            </span>
                        )}
                    </span>
                </div>
                {/* calender section */}

                {!calendarState && (
                    <div className=" rounded-tl-lg rounded-tr-lg border border-[#b9b9b9] w-full min-h-[60px] mt-6 relative flex flex-col">
                        {/* dates & calendar & guests here */}
                        <div>
                            <div
                                onClick={() => {
                                    setCalendarState(true);
                                }}
                                className=" grid grid-cols-2 cursor-pointer"
                            >
                                <div className="px-3 py-3">
                                    <p className=" text-[10px] text-black font-semibold uppercase">
                                        check-in
                                    </p>
                                    <p className=" text-sm text-[#222222]">{localStartDate}</p>
                                </div>
                                <div className="px-3 py-3 border-l border-[#b9b9b9]">
                                    <p className=" text-[10px] text-black font-semibold uppercase">
                                        checkout
                                    </p>
                                    <p className=" text-sm text-[#222222]">{localEndDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* guest selection */}

                {!calendarState && (
                    <div
                        ref={dropdownRef}
                        onClick={() => {
                            setShowDropdown((prev) => !prev);
                        }}
                    >
                        <div className=" rounded-bl-lg rounded-br-lg border border-[#b9b9b9] w-full min-h-[50px] cursor-pointer relative">
                            {/* guests data */}
                            <div className="px-3 py-3 flex flex-row items-center justify-between">
                                <div className=" flex flex-col">
                                    <p className=" text-[10px] text-black font-semibold uppercase">
                                        guests
                                    </p>
                                    <p className=" text-sm text-[#222222]">
                                        {guestsNumber + childrenNumber} {guestsNumber + childrenNumber === 1 ? "guest" : "guests"}
                                    </p>
                                </div>
                                <div>
                                    {showDropdown ? (
                                        <MdKeyboardArrowUp size={26} />
                                    ) : (
                                        <MdKeyboardArrowDown size={26} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* guests data dropdown */}
                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        className="min-h-[200px] w-72 shadow-lg border absolute z-[90] bg-white px-4 py-5 rounded-md"
                    >
                        <div className=" flex flex-col gap-5">
                            <div className=" flex felx-row items-center justify-between">
                                {/* adults number here */}
                                <span>
                                    <p className=" text-base text-[#222222] font-medium">
                                        Adults
                                    </p>
                                    <p className=" text-sm text-[#313131]">Age 13+</p>
                                </span>
                                {/* icons */}
                                <span className=" flex flex-row-reverse items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setGuestsNumber((prev) => prev + 1);
                                        }}
                                        disabled={listingData?.floorPlan?.guests === guestsNumber + childrenNumber}
                                        className={` p-2 rounded-full border border-[#c0c0c0] opacity-90 disabled:cursor-not-allowed disabled:opacity-20`}
                                    >
                                        <AiOutlinePlus size={16} />
                                    </button>
                                    <p className=" w-[30px] flex justify-center">
                                        {guestsNumber}
                                    </p>

                                    <button
                                        onClick={() => {
                                            setGuestsNumber((prev) => prev - 1);
                                        }}
                                        disabled={guestsNumber === 1}
                                        className=" p-2 rounded-full border border-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-20"
                                    >
                                        <AiOutlineMinus size={16} />
                                    </button>
                                </span>
                            </div>
                            <div className=" flex felx-row items-center justify-between">
                                {/* children number here */}
                                <span>
                                    <p className=" text-base text-[#222222] font-medium">
                                        Children
                                    </p>
                                    <p className=" text-sm text-[#313131]">Ages 2-12</p>
                                </span>
                                {/* icons */}
                                <span className=" flex flex-row-reverse items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setChildrenNumber((prev) => prev + 1);
                                        }}
                                        disabled={listingData?.floorPlan?.guests === guestsNumber + childrenNumber}
                                        className=" p-2 rounded-full border border-[#c0c0c0] opacity-90 disabled:cursor-not-allowed disabled:opacity-20"
                                    >
                                        <AiOutlinePlus size={16} />
                                    </button>
                                    <p className=" w-[30px] flex justify-center">
                                        {childrenNumber}
                                    </p>

                                    <button
                                        onClick={() => {
                                            setChildrenNumber((prev) => prev - 1);
                                        }}
                                        disabled={childrenNumber === 0}
                                        className=" p-2 rounded-full border border-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-20"
                                    >
                                        <AiOutlineMinus size={16} />
                                    </button>
                                </span>
                            </div>
                        </div>
                        {/* close btn */}
                        <div className=" flex justify-end absolute bottom-3 right-2">
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                }}
                                className="underline text-base text-[#222222] font-medium px-3 py-2 rounded-lg hover:bg-[#f5f5f5]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* reservation button */}
                {!showDropdown && !calendarState && (
                    <div className=" mt-6 flex justify-center rounded-md">
                        <button
                            onClick={() => {
                                handleBooking();
                            }}
                            className="capitalize py-2.5 w-full hover:bg-[#5e62d4] bg-[#7377db] transition duration-200 ease-in text-white font-medium text-lg rounded-md"
                        >
                            book
                        </button>
                    </div>
                )}

                {/* calendar & date picker */}
                {!calendarState ? null : (
                    <div
                        ref={calendarRef}
                        className=" absolute border-b-[1.2px] border-neutral-200 shadow-md left-[2px] sm:translate-x-[30%] sm:translate-y-[0%] md:translate-x-[-30%] lg:translate-x-[-20%] xl:translate-x-0 xl:translate-y-0"
                    >
                        <DateRange
                            rangeColors={["#262626"]}
                            date={new Date()}
                            editableDateInputs={true}
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={false}
                            ranges={selectedDates}
                            direction="vertical"
                            showDateDisplay={false}
                            minDate={new Date()}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default DatePicker