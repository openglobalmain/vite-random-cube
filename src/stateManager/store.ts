import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./reducers/UserInfoSlice";
import { newBettingApi } from "../api/apiSlice";

export const store = configureStore({
    reducer: {
        [newBettingApi.reducerPath]: newBettingApi.reducer,
        userInfo: userInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([newBettingApi.middleware]),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
