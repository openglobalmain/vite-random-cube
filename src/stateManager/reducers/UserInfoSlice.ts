import { createSlice } from "@reduxjs/toolkit";
import { IUserAction } from "../storeModels/IUser";
import {
    getItemWebStorage,
    setItemWebStorage,
} from "../../features/webStorageSaver";
import { clientSample } from "../../assets/clientSample";

const initialState: IUserAction = {
    userBalance: getItemWebStorage("userBalance") || "100",//Вынужденное решение, за неимением возможности класть информацию в бэк
    userBet: "1.00",
    userChoice: "no",
    diceSide: 6,
    diceBetSide: 1,
    userPassword: "",
    userLogin: "",
    userInfoObj: clientSample,//Вынужденное решение, за неимением возможности класть информацию в бэк
    isLoginWidgetActive: false,
    isRegisterWidgetActive: false,
};

export const userInfoSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setTypeOfUserChoice: (state, action) => {
            state.userChoice = action.payload;
        },
        setActualBalance: (state, action) => {
            state.userBalance = action.payload;
            setItemWebStorage("userBalance", action.payload);
        },
        setActualBet: (state, action) => {
            state.userBet = action.payload;
        },
        setActualSide: (state, action) => {
            state.diceSide = action.payload;
        },
        setActualBetSide: (state, action) => {
            state.diceBetSide = action.payload;
        },
        setUserPassword: (state, action) => {
            state.userPassword = action.payload;
        },
        setUserLogin: (state, action) => {
            state.userLogin = action.payload;
        },
        clearReduxState: (state) => {
                (state.userBet = "1.00"),
                (state.userChoice = "no"),
                (state.diceSide = 6),
                (state.diceBetSide = 1),
                (state.userPassword = ""),
                (state.userLogin = ""),
                (state.isLoginWidgetActive = true),
                (state.userInfoObj = clientSample);
        },
        setUserInfoObj: (state, action) => {
            state.userInfoObj = action.payload;
            setItemWebStorage("userInfoObj", action.payload);
        },
        setLoginWidgetActive: (state, action) => {
            state.isLoginWidgetActive = action.payload;
        },
        setRegisterWidgetActive: (state, action) => {
            state.isRegisterWidgetActive = action.payload;
        },
    },
});

export const {
    setTypeOfUserChoice,
    setActualBalance,
    setActualBet,
    setActualSide,
    setActualBetSide,
    setUserPassword,
    setUserLogin,
    clearReduxState,
    setUserInfoObj,
    setLoginWidgetActive,
    setRegisterWidgetActive,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
