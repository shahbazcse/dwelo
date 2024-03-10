import axios from "axios";

const BACKEND_API = "https://dwelo-backend.vercel.app";

export const getUserDetails = () => async (dispatch) => {
    try {
        const session = JSON.parse(localStorage.getItem("session"));
        const response = await axios.get(
            `${BACKEND_API}/user/getUser/${session.user.email}`
        );
        dispatch({ type: "SET_USER_DETAILS", payload: response.data.user });
    } catch (error) {
        console.error("[USER_DETAILS]", error);
    }
};
