import React, { useState } from "react";
import { Button } from "../components/ui/button";
import BookingHistory from "../components/dashboard/BookingHistory";
import Favourites from "../components/dashboard/Favourites";
import Profile from "../components/dashboard/Profile";

const Dashboard = () => {
    const [menu, setMenu] = useState("booking_history")
    return (
        <div className="mx-auto max-w-[91rem]">
            <div className="mx-auto min-h-[44rem] max-w-[64rem] mt-20 mb-24 rounded-t-3xl border shadow-md">
                <div className="flex items-center justify-start sm:justify-end overflow-auto gap-4 p-6 border-b">
                    <Button onClick={() => setMenu("booking_history")} variant={menu === "booking_history" ? "default" : "outline"} className="px-4 py-2 rounded-full shadow-sm">Booking History</Button>
                    <Button onClick={() => setMenu("favourites")} variant={menu === "favourites" ? "default" : "outline"} className="px-4 py-2 rounded-full shadow-sm">Favourites</Button>
                    <Button onClick={() => setMenu("profile")} variant={menu === "profile" ? "default" : "outline"} className="px-4 py-2 rounded-full shadow-sm">Profile</Button>
                    <Button variant="destructive" className="px-4 py-2 rounded-full shadow-sm">Logout</Button>
                </div>
                <div className="min-h-[38.3rem] bg-gray-50">
                    {menu === "booking_history" && <BookingHistory />}
                    {menu === "favourites" && <Favourites />}
                    {menu === "profile" && <Profile />}
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
