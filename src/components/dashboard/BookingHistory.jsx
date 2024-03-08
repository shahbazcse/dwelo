import React from 'react'
import { ScrollArea } from '../ui/scroll-area'

const BookingHistory = () => {
    return (
        <div className='font-[roboto] tracking-wide w-full'>
            <ScrollArea className="h-[38.3rem] mr-1">
                <div className='flex flex-col gap-6 px-5 py-4'>
                    {[...Array(10)].map((e, index) => (
                        <div key={index} className='flex flex-wrap items-center justify-start md:justify-between gap-8 p-6 border rounded-xl bg-white shadow-md'>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Hotel</p>
                                <p className='line-clamp-1'>Blue Haven, New Delhi, India</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Booking Date</p>
                                <p>26/04/2024</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Check In</p>
                                <p>28/04/2024</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Check Out</p>
                                <p>29/04/2024</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Total Price</p>
                                <p>$426</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default BookingHistory