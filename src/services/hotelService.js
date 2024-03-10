import axios from "axios";

const BACKEND_API = "https://dwelo-backend.vercel.app";

export const getAllHotels = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BACKEND_API}/hotel/getAllHotels`);
        dispatch({ type: "ADD_HOTELS_DATA", payload: response.data.hotels });
    } catch (error) {
        console.error("[GET_ALL_HOTELS]", error);
    }
};

export const getHotelById = (hotelId) => async (dispatch) => {
    try {
        const response = await axios.get(`${BACKEND_API}/hotel/${hotelId}`);
        dispatch({ type: "SET_HOTEL_DETAILS", payload: response.data.hotel });
    } catch (error) {
        console.error("[GET_HOTEL_BY_ID]", error);
    }
};

export const addHotelBooking = async (hotelId, bookingDates) => {
    try {
        await axios.post(`${BACKEND_API}/hotel/addBooking`, {
            hotelId,
            bookingDates,
        });
    } catch (error) {
        console.error("[ADD_HOTEL_BOOKING]", error);
    }
};
