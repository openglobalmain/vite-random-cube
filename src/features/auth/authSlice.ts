import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import type { ILogin } from "../../models/storeModels/ILogin";

const initialState: ILogin = {
    token: null
}

export const logout = createAction('auth/logout')

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<ILogin>) => {
            const payload = action.payload
            state.token = payload.token
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    },
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: { auth: { token: any; }; }) => state.auth.token