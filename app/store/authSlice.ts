// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/app/models/User';

export interface AuthState {
    uid: string;
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    uid: "",
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ uid: string; user: User }>) => {
            state.uid = action.payload.uid;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.uid = "";
            state.user = null;
            state.isAuthenticated = false;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

// Export actions
export const { login, logout, updateUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;