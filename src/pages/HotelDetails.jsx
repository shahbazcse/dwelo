import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HotelTitle from "../components/hotel/HotelTitle";
import HotelPhotos from "../components/hotel/HotelPhotos";
import HotelDescription from "../components/hotel/HotelDescription";
import DatePicker from "../components/hotel/DatePicker";
import { getHotelById } from "../services/hotelService";
import { useDispatch, useSelector } from "react-redux";
import SkeletonHotelDetails from "../components/skeleton/SkeletonHotelDetails";

const HotelDetails = () => {
    const [loading, setLoading] = useState(false)
    const params = useParams();
    const dispatch = useDispatch();

    const hotel = useSelector((state) => state.hotels.hotelDetails);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatch(getHotelById(params.id));
        }, 2000)
    }, [params.id, dispatch]);

    if (loading) {
        return <SkeletonHotelDetails />
    }

    return (
        <main className="max-w-screen-xl xl:px-12 mx-auto py-12 px-5 sm:px-16 md:px-8">
            <section className=" flex flex-col-reverse md:flex-col gap-7">
                <HotelTitle listingData={hotel} />
                <HotelPhotos listingData={hotel} />
            </section>
            <section className=" grid grid-cols-1 md:grid-cols-8 lg:grid-cols-6 md:gap-x-8 lg:gap-x-20 pt-8 sm:pt-12 md:pt-16">
                <div className="md:col-span-5 lg:col-span-4 order-2 md:order-1 flex flex-col h-fit pt-16 sm:pt-20 md:pt-0">
                    <HotelDescription listingData={hotel} />
                </div>
                <div className="md:col-span-3 lg:col-span-2 order-1 md:order-2 max-h-[900px]">
                    <DatePicker listingData={hotel} />
                </div>
            </section>
        </main>
    );
};

export default HotelDetails;
