import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import HotelPreviewCard from "../components/hotel/HotelPreviewCard";
import SkeletonLoadingCards from "../components/skeleton/SkeletonLoadingCards";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../services/hotelService";

import notfound from "../assets/notfound.png";

const Hotels = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const { hotelsData } = useSelector((state) => state.hotels);
    const { query } = useSelector((state) => state.global);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getAllHotels());
            setLoading(false);
        }, 2000);
    }, [dispatch]);

    const filteredHotels = hotelsData.filter(
        (hotel) =>
            hotel?.title.toLowerCase().includes(query.toLowerCase()) ||
            hotel?.location?.country?.name
                ?.toLowerCase()
                .includes(query.toLowerCase()) ||
            hotel?.location?.city?.name
                ?.toLowerCase()
                .includes(query.toLowerCase()) ||
            hotel?.location?.state?.name?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <main className="max-w-screen-2xl xl:px-10 px-5 sm:px-16 mx-auto min-h-screen py-4">
            {loading ? (
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
            ) : filteredHotels.length ? (
                <section className="font-[roboto] py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-x-7 gap-y-10">
                    {filteredHotels &&
                        filteredHotels.length !== 0 &&
                        filteredHotels.map((listing) => {
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
            ) : (
                <div className="flex flex-col items-center justify-center gap-6 mt-[12rem]">
                    <img
                        className="m-auto h-32 w-32 opacity-50"
                        src={notfound}
                        alt="notfound"
                    />
                    <p className="opacity-40 text-2xl font-[raleway]">Not Found</p>
                </div>
            )}
        </main>
    );
};

export default Hotels;
