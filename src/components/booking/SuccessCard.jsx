import React, { useEffect } from "react";

import success from "../../assets/success.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SuccessCard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
        <div className="font-[roboto] text-center flex flex-col items-center gap-6 justify-center w-full rounded-md border py-10 px-4">
            <div className="flex flex-wrap-reverse items-center justify-center gap-2">
                <p className="text-xl">Your payment is successful</p>
                <img className="h-9 w-9" src={success} alt="success" />
            </div>
            <div className="text-md text-gray-700">
                <p>Thank you for your payment</p>
                <p>
                    An automated payment receipt will be sent to your registered email
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                <p>Check your Booking History on</p>
                <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="rounded-full font-semibold font-[raleway]"
                >
                    Dashboard
                </Button>
            </div>
        </div>
    );
};

export default SuccessCard;
