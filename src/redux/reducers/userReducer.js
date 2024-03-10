const initialState = {
    userDetails: null,
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER_SIGN_UP":
            return {
                ...state,
                userDetails: payload.user_details,
            };
        case "USER_LOG_IN":
            return {
                ...state,
                userDetails: payload.user_details,
            };
        case "USER_LOG_OUT": {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return {
                userDetails: null,
            };
        }
        case "SET_USER_DETAILS":
            return {
                userDetails: payload,
            };
        default:
            return state;
    }
};

export default userReducer;
