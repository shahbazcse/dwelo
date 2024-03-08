import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHotelDetails } from "../redux/actions/hotelActions";
import HotelTitle from "../components/hotel/HotelTitle";
import HotelPhotos from "../components/hotel/HotelPhotos";
import HotelDescription from "../components/hotel/HotelDescription";
import DatePicker from "../components/hotel/DatePicker";

const HotelDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const hotelDetails = useSelector((state) => state.hotels.hotelDetails);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        dispatch(getHotelDetails(params.id));
    }, [params.id, dispatch]);

    return (
        <main className="max-w-screen-xl xl:px-12 mx-auto py-12 px-5 sm:px-16 md:px-8">
            <section className=" flex flex-col-reverse md:flex-col gap-7">
                {/* listing title & wishlist */}
                <HotelTitle listingData={hotelDetails} />
                {/* listing photos */}
                <HotelPhotos listingData={hotelDetails} />
            </section>
            <section className=" grid grid-cols-1 md:grid-cols-8 lg:grid-cols-6 md:gap-x-8 lg:gap-x-20 pt-8 sm:pt-12 md:pt-16">
                {/* listings description and details */}
                <div className="md:col-span-5 lg:col-span-4 order-2 md:order-1 flex flex-col h-fit pt-16 sm:pt-20 md:pt-0">
                    <HotelDescription
                        listingData={hotelDetails}
                    />
                </div>
                {/* reservations of the listing */}
                <div className="md:col-span-3 lg:col-span-2 order-1 md:order-2 max-h-[900px]">
                    <DatePicker listingData={hotelDetails} />
                </div>
            </section>
        </main>
    );
};

export default HotelDetails;