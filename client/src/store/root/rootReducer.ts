import { combineReducers } from "redux";

// Slices
import userReducer from '../feature/user/userSlice';

export const rootReducer : any = combineReducers({
    users: userReducer,
});