import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import hotelsReducer from "../reducers/hotelReducer";
import bookingsReducer from "./bookingReducer";
import globalReducer from "./globalReducer";

const rootReducer = combineReducers({
    user: userReducer,
    hotels: hotelsReducer,
    bookings: bookingsReducer,
    global: globalReducer
});

export default rootReducer;
