import { IClientLogin } from "../../models/IClient";

export interface IUserAction {
    userBet: string;
    userBalance: string;
    userChoice: string;
    userLogin: string;
    userPassword: string;
    diceSide: number;
    diceBetSide: number;
    userInfoObj: IClientLogin;
    isLoginWidgetActive: boolean;
    isRegisterWidgetActive: boolean;
}
