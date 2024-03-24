import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import BookingHistory from "../components/dashboard/BookingHistory";
import Favourites from "../components/dashboard/Favourites";
import Profile from "../components/dashboard/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Dashboard = () => {
    const [menu, setMenu] = useState("booking_history");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userDetails } = useSelector((state) => state.user);

    const handleLogout = () => {
        setLoading(true);
        localStorage.clear("session");
        setTimeout(() => {
            navigate("/login");
            setLoading(false);
        }, 3000);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    return (
        <div className="mx-auto max-w-[91rem] min-h-screen">
            <div className="mx-auto min-h-[44rem] max-w-[64rem] my-4 md:mt-20 md:mb-24 rounded-t-3xl border shadow-md">
                <div className="flex items-center justify-start sm:justify-end overflow-auto gap-4 p-6 border-b">
                    <Button
                        onClick={() => setMenu("booking_history")}
                        variant={menu === "booking_history" ? "default" : "outline"}
                        className="px-4 py-2 rounded-full shadow-sm"
                    >
                        Booking History
                    </Button>
                    <Button onClick={() => setMenu("favourites")} variant={menu === "favourites" ? "default" : "outline"} className="px-4 py-2 rounded-full shadow-sm">Favourites</Button>
                    <Button
                        onClick={() => setMenu("profile")}
                        variant={menu === "profile" ? "default" : "outline"}
                        className="px-4 py-2 rounded-full shadow-sm"
                    >
                        Profile
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="px-4 py-2 w-[5rem] rounded-full shadow-sm"
                    >
                        {loading ? (
                            <TailSpin
                                visible={true}
                                height="24"
                                width="24"
                                color="#FFFFFF"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperClass=""
                            />
                        ) : (
                            "Logout"
                        )}
                    </Button>
                </div>
                <div className="min-h-[38.3rem] bg-gray-50">
                    {menu === "booking_history" && (
                        <BookingHistory bookings={userDetails?.bookings} />
                    )}
                    {menu === "favourites" && <Favourites favourites={userDetails?.favourites} />}
                    {menu === "profile" && <Profile user={userDetails} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
