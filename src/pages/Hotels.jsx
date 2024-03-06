import React, { useEffect, useState } from "react";
import { allListingData } from "../mockData";
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import HotelPreviewCard from "../components/hotel/HotelPreviewCard";
import SkeletonLoadingCards from "../components/skeleton/SkeletonLoadingCards";
import { useDispatch } from "react-redux";
import { saveHotels } from "../redux/actions/hotelActions";

const Hotels = () => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(saveHotels(allListingData));
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, []);
    return (
        <main className="max-w-screen-2xl xl:px-10 px-5 sm:px-16 mx-auto h-fit py-4">
            {/* house listing data section */}
            {/* if sub cat listing data is loading else */}
            {isLoading ? (
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
                    {/* all listing data fetching */}
                    <section className="font-[roboto] py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-x-7 gap-y-10">
                        {allListingData &&
                            allListingData.length !== 0 &&
                            allListingData.map((listing) => {
                                return (
                                    // this will be link to see full details of the listing
                                    <Link
                                        to={`/hotel/${listing?._id}`}
                                        key={listing._id}
                                        className=" flex flex-col gap-3 rounded-xl w-full sm:max-w-[300px] md:w-full mx-auto"
                                    >
                                        <HotelPreviewCard
                                            listingData={listing}
                                        />
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