import React, { useState } from 'react'
import { Input } from '../ui/input';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuccessCard from './SuccessCard';
import { TailSpin } from 'react-loader-spinner';

const PaymentMethod = ({ showSuccessCard, setShowSuccessCard }) => {
    const navigate = useNavigate();

    const [togglePayment, setTogglePayment] = useState("CC");
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        cardNo: "",
        expiry: "",
        cvc: null,
        name: "",
        email: ""
    })

    const newBookingData = useSelector(
        (state) => state.bookings?.newBookingData
    );

    const generateRandom = () => {
        setFormData({
            cardNo: "376867078977558",
            expiry: "7/2025",
            cvc: "934",
            name: "Harry Potter",
            email: "harry@hogwarts.com"
        })
    }

    const handleBooking = () => {
        if (togglePayment === "POA" || togglePayment === "CC" && formData.cardNo !== "" && formData.expiry !== "" && formData.cvc.length === 3 && formData.name !== "" && formData.email !== "") {
            // handle redux and api calls here
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                setShowSuccessCard(true);
            }, 3000);
        }
    }

    return (
        <>
            {!showSuccessCard ? (
                <section className="bg-white border rounded-md text-gray-600 p-4">
                    <div className="flex justify-center mb-6 rounded-md bg-gray-100 p-1">
                        <button onClick={() => setTogglePayment("CC")} className={`${togglePayment === "CC" && "rounded-md border shadow-sm bg-white"} relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2`}>Pay With Card</button>
                        <button onClick={() => setTogglePayment("POA")} className={`${togglePayment === "POA" && "rounded-md border shadow-sm bg-white"} relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2`}>Pay On Arrival</button>
                    </div >
                    {togglePayment === "CC" ? (
                        <div className='space-y-4'>
                            <div className="space-y-4">
                                <div>
                                    <div className='flex items-start justify-between'>
                                        <label className="text-sm font-medium mb-1">Card Number <span className="text-red-500">*</span></label>
                                        <p onClick={generateRandom} className='text-xs px-1.5 bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-400 rounded-lg'>Genrate Random</p>
                                    </div>
                                    <Input value={formData.cardNo} onChange={(e) => setFormData({ cardNo: e.target.value })} className="font-[roboto] text-md tracking-wide font-semibold focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300" placeholder="1234 1234 1234 1234" />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-medium mb-1">Expiry Date <span className="text-red-500">*</span></label>
                                        <Input value={formData.expiry} onChange={(e) => setFormData({ expiry: e.target.value })} className="font-[roboto] text-md tracking-wide font-semibold focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300" placeholder="MM/YY" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm font-medium mb-1">CVC <span className="text-red-500">*</span></label>
                                        <Input value={formData.cvc} onChange={(e) => setFormData({ cvc: e.target.value })} className="font-[roboto] text-md tracking-wide font-semibold focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300" placeholder="CVC" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1">Name on Card <span className="text-red-500">*</span></label>
                                    <Input value={formData.name} onChange={(e) => setFormData({ name: e.target.value })} className="font-[roboto] text-md tracking-wide font-semibold focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                                    <Input value={formData.email} onChange={(e) => setFormData({ email: e.target.value })} className="font-[roboto] text-md tracking-wide font-semibold focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300" placeholder="john@company.com" />
                                </div>
                            </div>
                            <p className="text-xs opacity-70 font-[roboto]">
                                By selecting the button below, I agree to the Dwelo's
                                Rules, Ground rules for guests, Dwelo's Rebooking and Refund
                                Policy, and that Dwelo can charge my payment method if I'm
                                responsible for damage.
                            </p>
                            <button onClick={handleBooking} className="font-medium text-sm inline-flex items-center justify-center px-3 py-2.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full hover:bg-[#5e62d4] bg-[#7377db] text-white focus:outline-none focus-visible:ring-2">
                                {isLoading ? (
                                    <TailSpin visible={true}
                                        height="20"
                                        width="20"
                                        color="#FFFFFF"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperClass="" />
                                ) : "Confirm and Pay Now"}
                            </button>
                        </div>

                    ) : (
                        <div className='space-y-4'>
                            <div className='text-sm font-[roboto] leading-5'>Please note that payment is due upon arrival. We accept cash, credit/debit cards. If you have any questions or concerns regarding payment, feel free to contact us. We look forward to serving you!</div>
                            <p className="text-xs opacity-70 font-[roboto]">
                                By selecting the button below, I agree to the Dwelo's
                                Rules, Ground rules for guests, Dwelo's Rebooking and Refund
                                Policy, and that Dwelo can charge my payment method if I'm
                                responsible for damage.
                            </p>
                            <button onClick={handleBooking} className="font-medium text-sm inline-flex items-center justify-center px-3 py-2.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full hover:bg-[#5e62d4] bg-[#7377db] text-white focus:outline-none focus-visible:ring-2">
                                {isLoading ? (
                                    <TailSpin visible={true}
                                        height="20"
                                        width="20"
                                        color="#FFFFFF"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperClass="" />
                                ) : "Confirm and Pay Later"}
                            </button>
                        </div>
                    )}
                </section>

            ) : (
                <SuccessCard />
            )}
        </>
    )
}

export default PaymentMethod