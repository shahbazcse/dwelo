const initialState = {
    query: "",
}

const globalReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "UPDATE_QUERY":
            return {
                ...state,
                query: payload,
            };
        default:
            return state;
    }
};

export default globalReducer;