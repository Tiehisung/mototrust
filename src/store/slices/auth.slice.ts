import { IUser } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('mototrust_token'),
    isAuthenticated: !!localStorage.getItem('mototrust_token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('mototrust_token', action.payload.token);
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('mototrust_token');
        },
    },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;