import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

import { IoCloseOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { getUserDetails, removeFavourite } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";

const Favourites = ({ favourites }) => {
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);

    const { userDetails } = useSelector((state) => state.user);

    async function handleRemove(hoteId) {
        if (!isProcessing) {
            setIsProcessing(true);
            const response = await removeFavourite(userDetails?.email, hoteId);
            if (response.status === 200) {
                setIsProcessing(false);
            }
        }
    }

    useEffect(() => {
        dispatch(getUserDetails());
    }, [isProcessing])

    return (
        <div className="font-[roboto] tracking-wide w-full">
            {
                favourites.length ? (
                    <ScrollArea className="h-[38.3rem] mr-1">
                        <div className="flex flex-col gap-9 px-7 py-8">
                            {favourites?.map(({ _id, title, location, basePrice, amenities, photos }, index) => (
                                <div
                                    key={index}
                                    className="relative grid grid-rows-1 lg:grid-cols-10 items-center justify-center border rounded-xl bg-white shadow-md"
                                >
                                    <img src={photos?.[0]} alt="hotelpicture" className="h-inherit w-36 m-4 lg:mr-0 aspect-square rounded-md lg:col-span-2" />
                                    <div className="flex flex-wrap items-center justify-start gap-8 p-6 lg:pl-0 lg:col-span-8">
                                        <div className="flex flex-col items-start justify-center gap-2">
                                            <p className="text-sm text-gray-500">Hotel</p>
                                            <p className="line-clamp-1">{title}</p>
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-2">
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p>{location?.addressLineOne}</p>
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-2">
                                            <p className="text-sm text-gray-500">Base Price</p>
                                            <p>${basePrice}</p>
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-2">
                                            <p className="text-sm text-gray-500">Amenities</p>
                                            <p className="line-clamp-1">
                                                {
                                                    amenities?.map((i) => (<span>{i}, </span>))
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleRemove(_id)}
                                        variant="outline"
                                        className="absolute rounded-full p-1.5 -top-4 -right-3"
                                    >
                                        <IoCloseOutline className="h-6 w-6" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    (
                        <div className="flex items-center justify-center pt-16 font-[raleway] text-lg">
                            No Favourites Added
                        </div>
                    )
                )
            }
        </div>
    );
};

export default Favourites;
