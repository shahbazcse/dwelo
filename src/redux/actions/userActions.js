export const userSignUp = (userData) => async (dispatch) => {
    dispatch({
        type: "USER_SIGN_UP",
        payload: userData
    })
}

export const userLogIn = (userData) => async (dispatch) => {
    console.log(userData.user_details)
    dispatch({
        type: "USER_LOG_IN",
        payload: userData
    })
}

export const userLogOut = () => async (dispatch) => {
    // const response = await api.post("/auth/logout");
    dispatch({ type: "USER_LOG_OUT" })
}