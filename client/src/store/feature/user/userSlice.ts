import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root/store';

const initialState: any = {
    users: [],
    user: {},
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setUserById: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUsers, setUserById } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState) => state.users.user;

export default userSlice.reducer;