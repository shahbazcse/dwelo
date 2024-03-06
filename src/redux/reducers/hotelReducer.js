const initialState = {
    hotelsData: [],
    hotelDetails: {},
}

const hotelsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "ADD_HOTELS_DATA":
            return {
                ...state,
                hotelsData: payload
            }
        case "GET_HOTEL_DETAILS":
            return {
                ...state,
                hotelDetails: state.hotelsData.find(({ _id }) => _id === payload)
            }
        default:
            return state;
    }

}

export default hotelsReducer;