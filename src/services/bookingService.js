import axios from "axios";

const BACKEND_API = "https://dwelo-backend.vercel.app";

export const newBooking = (data) => async (dispatch) => {
    const bookingData = {
        hotelId: data?.listingData?._id,
        authorId: data?.listingData?.author,
        checkIn: data?.formattedStartDate,
        checkOut: data?.formattedEndDate,
        nightStaying: data?.nightsStaying,
        guestNumber: data?.totalGuest,
        basePrice: data?.listingData?.basePrice,
        listingData: data?.listingData,
        bookingDate: data?.bookingDate,
        totalPrice: data?.totalPrice,
    };
    dispatch({
        type: "NEW_BOOKING_DATA",
        payload: bookingData,
    });
};

export const confirmBooking = async (data) => {
    try {
        const session = JSON.parse(localStorage.getItem("session"));
        await axios.post(`${BACKEND_API}/user/addBooking`, {
            email: session.user.email,
            booking: data,
        });
    } catch (error) {
        console.error("[CONFIRM_BOOKING]", error);
    }
};
