import React from "react";
import { ScrollArea } from "../ui/scroll-area";

const BookingHistory = ({ bookings }) => {
    return (
        <div className="font-[roboto] tracking-wide w-full">
            {bookings?.length ? (
                <ScrollArea className="h-[38.3rem] mr-1">
                    <div className="flex flex-col gap-6 px-5 py-4">
                        {bookings?.map(
                            (
                                { bookingDate, checkIn, checkOut, totalPrice, listingData },
                                index
                            ) => (
                                <div
                                    key={index}
                                    className="flex flex-wrap items-center justify-start md:justify-between gap-8 p-6 border rounded-xl bg-white shadow-md"
                                >
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <p className="text-sm text-gray-500">Hotel</p>
                                        <p className="line-clamp-1">{listingData?.title}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <p className="text-sm text-gray-500">Booking Date</p>
                                        <p>{new Date(bookingDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <p className="text-sm text-gray-500">Check In</p>
                                        <p>{new Date(checkIn).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <p className="text-sm text-gray-500">Check Out</p>
                                        <p>{new Date(checkOut).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <p className="text-sm text-gray-500">Total Price</p>
                                        <p>${totalPrice}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </ScrollArea>
            ) : (
                <div className="flex items-center justify-center pt-16 font-[raleway] text-lg">
                    No History Found
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
