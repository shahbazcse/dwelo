const initialState = {
    hotelsData: [],
    hotelDetails: {},
};

const hotelsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "ADD_HOTELS_DATA":
            return {
                ...state,
                hotelsData: payload,
            };
        case "SET_HOTEL_DETAILS":
            return {
                ...state,
                hotelDetails: payload,
            };
        default:
            return state;
    }
};

export default hotelsReducer;
