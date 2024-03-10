const initialState = {
    newBookingData: null,
    loader: false,
};

const bookingsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "NEW_BOOKING_DATA": {
            return {
                ...state,
                newBookingData: payload,
            };
        }
        case "SET_LOADER": {
            return {
                ...state,
                loader: !state.loader,
            };
        }
        default:
            return state;
    }
};

export default bookingsReducer;
