import React from "react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { newBooking } from "../../services/bookingService";
import { parseISO } from "date-fns";

function checkAvailability(userCheckIn, userCheckOut, existingBookings) {
    const userCheckInDate = new Date(userCheckIn);
    const userCheckOutDate = new Date(userCheckOut);

    for (const booking of existingBookings) {
        const existingCheckInDate = new Date(booking.checkIn);
        const existingCheckOutDate = new Date(booking.checkOut);

        if (
            userCheckInDate < existingCheckOutDate &&
            userCheckOutDate > existingCheckInDate
        ) {
            return false;
        }
    }
    return true;
}

const DatePicker = ({ listingData }) => {
    const calendarRef = useRef();
    const dropdownRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state: calendarState, setState: setCalendarState } =
        useOutsideClick(calendarRef);
    const { state: showDropdown, setState: setShowDropdown } =
        useOutsideClick(dropdownRef);

    const [guestsNumber, setGuestsNumber] = useState(1);
    const [childrenNumber, setChildrenNumber] = useState(0);

    const [selectedDates, setSelectedDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const formattedStartDate = selectedDates[0]?.startDate?.toISOString();
    const formattedEndDate = selectedDates[0]?.endDate?.toISOString();

    const localStartDate = new Date(formattedStartDate).toLocaleDateString();
    const localEndDate = new Date(formattedEndDate).toLocaleDateString();

    const handleSelect = (ranges) => {
        setSelectedDates([ranges.selection]);
    };

    const calculateBooking = () => {
        const daysInMiliSec = Math.ceil(
            selectedDates?.[0]?.endDate - selectedDates?.[0]?.startDate
        );

        const calculatedNights = daysInMiliSec / (1000 * 60 * 60 * 24);
        const finalNights = calculatedNights === 0 ? 1 : calculatedNights;
        const calculatedBasePrice = listingData?.basePrice * finalNights;

        return { calculatedBasePrice, calculatedNights };
    };

    const calculateTotalPrice = (nightStaying, hotel) => {
        const basePrice =
            parseInt(nightStaying) !== 0
                ? parseInt(nightStaying) * hotel?.basePrice
                : hotel?.basePrice;

        const tax =
            basePrice !== 0
                ? Math.round((basePrice * 14) / 100)
                : Math.round((hotel?.basePrice * 14) / 100);

        const totalPrice = basePrice + tax;

        return totalPrice;
    };

    // handle booking
    const handleBooking = () => {
        if (
            !checkAvailability(
                formattedStartDate,
                formattedEndDate,
                listingData?.bookedDates
            )
        ) {
            return;
        }
        const { calculatedBasePrice, calculatedNights } = calculateBooking();
        const data = {
            listingData,
            formattedStartDate,
            formattedEndDate,
            nightsStaying: calculatedNights,
            totalGuest: guestsNumber + childrenNumber,
            bookingBasePrice: calculatedBasePrice,
            bookingDate: new Date(),
            totalPrice: calculateTotalPrice(calculatedNights, listingData),
        };
        // handle booking API here
        dispatch(newBooking(data));
        navigate(
            `/booking/${listingData._id}?numberOfGuests=${data.totalGuest}&nightStaying=${data.nightsStaying}&checkin=${data.formattedStartDate}&checkout=${data.formattedEndDate}`
        );
    };

    const disabledDateRanges = listingData?.bookedDates?.map((obj) => ({
        startDate: parseISO(obj.checkIn),
        endDate: parseISO(obj.checkOut),
    }));

    const disabledDates = disabledDateRanges?.reduce((dates, range) => {
        const startDate = new Date(range.startDate);
        const endDate = new Date(range.endDate);
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }, []);

    return (
        <>
            <div className="font-[roboto] w-full min-h-[315px] rounded-xl border border-[#dddddd] sticky top-32 shadow-customShadow p-6">
                <div className=" flex felx-row justify-between items-start">
                    <div className=" flex flex-col">
                        <h3 className="tracking-wider text-[22px] text-[#222222] font-semibold">
                            ${listingData?.basePrice}
                            <span className="text-gray-500 text-sm"> / Night</span>
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
                                        {guestsNumber + childrenNumber}{" "}
                                        {guestsNumber + childrenNumber === 1 ? "guest" : "guests"}
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
                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        className="min-h-[200px] w-72 shadow-lg border absolute z-[90] bg-white px-4 py-5 rounded-md"
                    >
                        <div className=" flex flex-col gap-5">
                            <div className=" flex felx-row items-center justify-between">
                                <span>
                                    <p className=" text-base text-[#222222] font-medium">
                                        Adults
                                    </p>
                                    <p className=" text-sm text-[#313131]">Age 13+</p>
                                </span>

                                <span className=" flex flex-row-reverse items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setGuestsNumber((prev) => prev + 1);
                                        }}
                                        disabled={
                                            listingData?.floorPlan?.guests ===
                                            guestsNumber + childrenNumber
                                        }
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
                                <span>
                                    <p className=" text-base text-[#222222] font-medium">
                                        Children
                                    </p>
                                    <p className=" text-sm text-[#313131]">Ages 2-12</p>
                                </span>

                                <span className=" flex flex-row-reverse items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setChildrenNumber((prev) => prev + 1);
                                        }}
                                        disabled={
                                            listingData?.floorPlan?.guests ===
                                            guestsNumber + childrenNumber
                                        }
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
                            disabledDates={disabledDates}
                            direction="vertical"
                            showDateDisplay={false}
                            minDate={new Date()}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default DatePicker;
