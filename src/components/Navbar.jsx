import React from "react";

import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const currentPage = window.location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { query } = useSelector((state) => state.global);

    const handleSearch = (query) => {
        navigate("/");
        dispatch({ type: "UPDATE_QUERY", payload: String(query) })
    }

    return (
        <div className="flex-1 border-b">
            <div className="h-20 px-8 max-w-[95rem] mx-auto flex items-center justify-between">
                <div
                    className="flex items-center justify-center gap-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img
                        src={Logo}
                        alt="logo"
                        className="h-8 w-8 shadow-xl rounded-full"
                    />
                    <span className="font-[poppins] font-bold tracking-wide text-xl text-[#7950F2] drop-shadow-md">
                        dwelo
                    </span>
                </div>
                <div className="mx-auto lg:block hidden w-[20rem]">
                    <div className="border-[1px] border-[#dddddd] rounded-full px-5 py-3 flex items-center justify-between shadow hover:shadow-md transition-all">
                        <input
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            className=" focus:outline-none"
                            placeholder="Search for places"
                        />
                        <Search className="cursor-pointer text-gray-300" />
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="hidden sm:flex rounded-full px-8 py-6"
                >
                    <div
                        onClick={() =>
                            navigate(`${currentPage === "/dashboard" ? "/" : "/dashboard"}`)
                        }
                        className="text-lg"
                    >
                        {currentPage === "/dashboard" ? "Hotels" : "Dashboard"}
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
