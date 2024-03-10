import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import hotelsReducer from "../reducers/hotelReducer";
import bookingsReducer from "./bookingReducer";

const rootReducer = combineReducers({
    user: userReducer,
    hotels: hotelsReducer,
    bookings: bookingsReducer,
});

export default rootReducer;
