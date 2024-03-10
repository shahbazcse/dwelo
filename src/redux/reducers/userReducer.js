const initialState = {
    userDetails: null,
    loader: false,
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_USER_DETAILS":
            return {
                userDetails: payload,
            };
        default:
            return state;
    }
};

export default userReducer;
