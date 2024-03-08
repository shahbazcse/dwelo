import React from 'react'
import { Button } from '../ui/button'

const Profile = () => {
    return (
        <div className='flex items-center justify-center font-[roboto] tracking-wide'>
            <div className='text-2xl flex flex-col flex-wrap items-start justify-between gap-8 min-w-[24vw] p-12 mt-24 border rounded-xl bg-white'>
                <div className='flex flex-wrap items-start justify-start gap-2'>
                    <p className='text-gray-500'>Name:</p>
                    <p>John Doe</p>
                </div>
                <div className='flex flex-wrap items-start justify-start gap-2'>
                    <p className='text-gray-500'>Email:</p>
                    <p>johndoe@email.com</p>
                </div>
                <div className='flex flex-wrap items-start justify-start gap-2'>
                    <p className='text-gray-500'>Total Bookings:</p>
                    <p>20</p>
                </div>
                <div className='flex flex-col items-start justify-start gap-4 mt-6'>
                    <Button variant="destructive" className="">Delete Account</Button>
                    <p className='text-xs text-red-500 font-semibold'>This action cannot be undone.</p>
                </div>
            </div>
        </div>
    )
}

export default Profile