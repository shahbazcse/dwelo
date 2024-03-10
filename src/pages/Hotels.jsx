import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import HotelPreviewCard from "../components/hotel/HotelPreviewCard";
import SkeletonLoadingCards from "../components/skeleton/SkeletonLoadingCards";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../services/hotelService";

const Hotels = () => {
    const dispatch = useDispatch();

    const { hotelsData, loader } = useSelector((state) => state.hotels);

    useEffect(() => {
        dispatch(getAllHotels());
    }, []);
    return (
        <main className="max-w-screen-2xl xl:px-10 px-5 sm:px-16 mx-auto min-h-screen py-4">
            {loader ? (
                <>
                    {window.innerWidth <= 1080 ? (
                        <div className="flex justify-center items-center h-[80dvh]">
                            <Grid
                                visible={true}
                                height="80"
                                width="80"
                                color="#7377db"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>
                    ) : (
                        <SkeletonLoadingCards />
                    )}
                </>
            ) : (
                <>
                    <section className="font-[roboto] py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-x-7 gap-y-10">
                        {hotelsData &&
                            hotelsData.length !== 0 &&
                            hotelsData.map((listing) => {
                                return (
                                    <Link
                                        to={`/hotel/${listing?._id}`}
                                        key={listing._id}
                                        className=" flex flex-col gap-3 rounded-xl w-full sm:max-w-[300px] md:w-full mx-auto"
                                    >
                                        <HotelPreviewCard listingData={listing} />
                                    </Link>
                                );
                            })}
                    </section>
                </>
            )}
        </main>
    );
};

export default Hotels;
