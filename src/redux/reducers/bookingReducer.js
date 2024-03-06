const initialState = {
    newBookingData: null,
}

const bookingsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "NEW_BOOKING_DATA": {
            return {
                ...state,
                newBookingData: payload
            }
        }
        default: return state;
    }
}

export default bookingsReducer;