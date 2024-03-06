import React from 'react'

import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png"
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const Navbar = () => {
    const currentPage = window.location.pathname;
    const navigate = useNavigate();

    return (
        <div className='h-20 px-[14rem] border-b flex items-center justify-between'>
            <div className='flex items-center justify-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                <img src={Logo} alt="logo" className='h-8 w-8 shadow-xl rounded-full' />
                <span className='font-[poppins] font-bold tracking-wide text-xl text-[#7950F2] drop-shadow-md'>dwelo</span>
            </div>
            <div className="mx-auto lg:block hidden w-[20rem]">
                <div className="border-[1px] border-[#dddddd] rounded-full px-5 py-3 flex items-center justify-between shadow hover:shadow-md transition-all">
                    <input
                        className=" focus:outline-none"
                        placeholder="Search for places"
                    />
                    <Search className='cursor-pointer text-gray-300' />
                </div>
            </div>
            <Button variant="outline" className="rounded-full px-8 py-6">
                <div onClick={() => navigate(`${currentPage === "/dashboard" ? "/" : "/dashboard"}`)} className='text-lg'>
                    {currentPage === "/dashboard" ? "Hotels" : "Dashboard"}
                </div>
            </Button>
        </div>
    )
}

export default Navbar