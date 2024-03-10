const initialState = {
    hotelsData: [],
    hotelDetails: {},
    loader: false,
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

export default hotelsReducer;
