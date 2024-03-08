import React from 'react'
import { ScrollArea } from '../ui/scroll-area'

import { IoCloseOutline } from "react-icons/io5";
import { Button } from '../ui/button';

const Favourites = () => {
    const isFavorited = true;
    return (
        <div className='font-[roboto] tracking-wide w-full'>
            <ScrollArea className="h-[38.3rem] mr-1">
                <div className='flex flex-col gap-9 px-7 py-8'>
                    {[...Array(10)].map((e, index) => (
                        <div key={index} className='relative flex flex-wrap items-center justify-start md:justify-between gap-8 p-6 border rounded-xl bg-white shadow-md'>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Hotel</p>
                                <p className='line-clamp-1'>Blue Haven</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Address</p>
                                <p>New Delhi, India</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Rating</p>
                                <p>4.5</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Amenities</p>
                                <p>TV, A/C, Free Parking, Grill, Campfire</p>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-2'>
                                <p className='text-sm text-gray-500'>Base Price</p>
                                <p>$42</p>
                            </div>
                            <Button variant="outline" className="absolute rounded-full p-1.5 -top-4 -right-3">
                                <IoCloseOutline className='h-6 w-6' />
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default Favourites