import { addToFavourite, getUserDetails, removeFavourite } from "../../services/userService";
import React, { useEffect, useState } from "react";

import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const HotelTitle = ({ listingData }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.user);

    const isSaved = userDetails?.favourites.find((hotel) => hotel?.title === listingData?.title);

    async function handleSave() {
        console.log("Reached");
        if (!isProcessing) {
            setIsProcessing(true);
            if (!isSaved) {
                const response = await addToFavourite(userDetails?.email, listingData);
                if (response.status === 201) {
                    setIsProcessing(false);
                }
            } else {
                const response = await removeFavourite(userDetails?.email, listingData._id);
                if (response.status === 200) {
                    setIsProcessing(false);
                }
            }
        }
    }

    useEffect(() => {
        dispatch(getUserDetails());
    }, [isProcessing]);
    return (
        <div className=" flex flex-col text-[#222222]">
            <p className="text-xl md:text-2xl font-medium">{listingData?.title}</p>
            <div className=" grid grid-cols-1 md:grid-cols-5 items-center justify-end">
                <div className=" flex flex-row flex-wrap md:flex-nowrap items-center gap-2 col-span-4">
                    <p className=" flex flex-row items-center gap-1">
                        {listingData?.ratings ? (
                            <>
                                <AiFillStar size={16} />
                                <p className=" text-xs sm:text-sm">{listingData?.ratings}</p>
                            </>
                        ) : (
                            <>
                                <AiFillStar size={16} />
                                <p className="text-xs sm:text-sm">New</p>
                            </>
                        )}
                    </p>
                    <span> · </span>
                    <p className="text-xs sm:text-sm font-medium underline">
                        {listingData?.location?.addressLineOne
                            ? listingData?.location?.addressLineOne
                            : listingData?.location?.addressLineTwo
                                ? listingData?.location?.addressLineTwo
                                : listingData?.location?.country?.name}
                    </p>
                </div>
                <div className="col-span-1 md:flex justify-end w-full hidden">
                    <div onClick={handleSave} className=" flex flex-row-reverse gap-2 items-center cursor-pointer p-2 rounded-md w-[80px] bg-white hover:bg-[#f1f1f1] transition duration-200 ease-in">
                        {isSaved ? <AiFillHeart className="fill-red-400" size={18} /> : <AiOutlineHeart size={18} />}
                        <p className=" text-sm font-medium">
                            {isSaved ? "Saved" : "Save"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelTitle;
