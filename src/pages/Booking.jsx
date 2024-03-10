import React from "react";

import { useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import Payment from "../components/booking/Payment";
import Hotel from "../components/booking/Hotel";

const Booking = () => {
    const [searchParams] = useSearchParams();

    const searchParamsObj = Object.fromEntries([...searchParams]);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <main className=" max-w-screen-2xl xl:px-12 mx-auto py-7 xl:pt-7 xl:pb-20">
            <div className=" flex flex-row gap-3 items-center px-3 md:px-5">
                <div
                    onClick={() => {
                        navigate(-1);
                    }}
                    className=" p-2 rounded-full hover:bg-[#f1f1f1] cursor-pointer transition duration-200 ease-in"
                >
                    <MdKeyboardArrowLeft size={28} />
                </div>
                <h2 className="text-lg sm:text-xl md:text-[32px] text-[#222222] font-medium text-center">
                    Confirm and pay
                </h2>
            </div>
            <section className=" grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 pt-10 px-8 md:px-10">
                <div className="order-2 md:order-1">
                    <Payment searchParamsObj={searchParamsObj} />
                </div>
                <div className="order-1 md:order-2">
                    <Hotel searchParamsObj={searchParamsObj} />
                </div>
            </section>
        </main>
    );
};

export default Booking;
