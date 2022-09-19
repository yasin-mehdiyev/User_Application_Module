import * as userService from '../../../services/UserService';
import { setUserById, setUsers } from "./userSlice";

export const fetchUsers = () => async (dispatch: any) => {
    try {
        const response: any = await userService.getAllUsers();
        const { success } = response;
        if (success) {
            dispatch(setUsers(response));
        }
    } catch (error) {
        console.log("error", error);
    }
};

export const fetchUserById = (id: string) => async (dispatch: any) => {
    try {
        const response: any = await userService.getUserById(id);
        const { success } = response;
        if (success) {
            dispatch(setUserById(response));
        }
    } catch (error) {
        console.log("error", error);
    }
};

export const removeUser = (id: string) => async () => {
    try {
        const response: any = await userService.deleteUser(id);
        return response;
    } catch (error) {
        console.log("error", error);
    }
};