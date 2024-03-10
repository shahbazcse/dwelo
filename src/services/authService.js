import axios from "axios";
const sign = require("jwt-encode");

const BACKEND_API = "https://dwelo-backend.vercel.app";
const REACT_APP_JWT_SECRET = "6AA46C1166A229A1229F77AC27845";

export const loginUser = (formData, rememberMe) => async (dispatch) => {
    try {
        const {
            data: { user },
        } = await axios.post(`${BACKEND_API}/user/login`, {
            ...formData,
        });
        dispatch({ type: "SET_USER_DETAILS", payload: user });
        const token = sign({ _id: user._id }, REACT_APP_JWT_SECRET);
        const session = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };
        if (rememberMe) localStorage.setItem("session", JSON.stringify(session));

        return {
            token,
        };
    } catch (error) {
        console.error("[LOGIN]", error);
    }
};
