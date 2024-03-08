export const newBooking = (data) => async (dispatch) => {
    const bookingData = {
        hotelId: data?.listingData?._id,
        authorId: data?.listingData?.author,
        checkIn: data?.formattedStartDate,
        checkOut: data?.formattedEndDate,
        nightStaying: data?.nightsStaying,
        guestNumber: data?.totalGuest,
        basePrice: data?.reservationBasePrice,
        listingData: data?.listingData
    }
    dispatch({
        type: "NEW_BOOKING_DATA",
        payload: bookingData
    })
}