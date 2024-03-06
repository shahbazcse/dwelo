export const getHotelDetails = (hotelId) => async (dispatch) => {
    dispatch({
        type: "GET_HOTEL_DETAILS",
        payload: hotelId
    })
}

export const saveHotels = (hotels) => async (dispatch) => {
    dispatch({
        type: "ADD_HOTELS_DATA",
        payload: hotels
    })
}