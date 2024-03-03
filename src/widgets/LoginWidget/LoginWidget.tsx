import { useEffect, useRef, useState } from "react";
import { close_button_icon } from "../../assets/icons";
import { useLoginMutation } from "../../api/apiSlice";
import { useAppSelector } from "../../stateManager/hooks/redux";
import { useDispatch } from "react-redux";
import {
    setLoginWidgetActive,
    setUserInfoObj,
    setUserLogin,
    setUserPassword,
} from "../../stateManager/reducers/UserInfoSlice";
import { betVocabulary } from "../../assets/vocabulary";

export const LoginWidget = () => {
    const dispatch = useDispatch();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutValidateRef = useRef<NodeJS.Timeout | null>(null);

    const [isLoginErrorShowing, setLoginErrorShowing] = useState(false);
    const [validateError, setValidateError] = useState(false);
    const [loginMute, { data: loginUserInfo, error: loginError }] =
        useLoginMutation();

    const { userLogin: localUserLogin, userPassword: localUserPassword } =
        useAppSelector((state) => state.userInfo);

    function setUserPasswordFunc(event: any) {
        const value = event.target.value;
        const data = event.nativeEvent.data;
        const regex = /[A-Za-z0-9]/;
        if (regex.test(data)) {
            setValidateError(false);
            dispatch(setUserPassword(value));
        } else {
            setValidateError(true);
            dispatch(setUserPassword(value.slice(0, -1)));
            if (timeoutValidateRef.current) {
                clearTimeout(timeoutValidateRef.current);
            }
            timeoutValidateRef.current = setTimeout(() => {
                setValidateError(false);
            }, 2600);
        }
    }
    function setUserLoginFunc(event: any) {
        const value = event.target.value;
        const data = event.nativeEvent.data;
        const regex = /[A-Za-z0-9]/;
        if (regex.test(data)) {
            setValidateError(false);
            dispatch(setUserLogin(value));
        } else {
            setValidateError(true);
            dispatch(setUserLogin(value.slice(0, -1)));
            if (timeoutValidateRef.current) {
                clearTimeout(timeoutValidateRef.current);
            }
            timeoutValidateRef.current = setTimeout(() => {
                setValidateError(false);
            }, 2600);
        }
    }
    function loginWindowLocalCloser() {
        dispatch(setLoginWidgetActive(false));
    }

    async function loginSubmitter(login: string, password: string) {
        const result = await loginMute({ login, password });
        if ("data" in result) {
            if (login && password) {
                if (!loginUserInfo) {
                    showLoginError();
                    dispatch(setUserInfoObj(result.data));
                } else {
                    dispatch(setLoginWidgetActive(false));
                }
            }
        }
    }
    function showLoginError() {
        if (loginError) {
            setLoginErrorShowing(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setLoginErrorShowing(false);
            }, 2600);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                loginSubmitter(localUserLogin, localUserPassword);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <>
            <div className="login-widget-mask">
                <div className="login-widget">
                    <div className="close-button-div">
                        <button
                            className="close-button"
                            onClick={loginWindowLocalCloser}
                        >
                            <img
                                src={close_button_icon}
                                alt="close-button"
                            ></img>
                        </button>
                    </div>
                    <div className="input-block">
                        {isLoginErrorShowing && (
                            <div className="login-error">
                                {betVocabulary.repeatWarning}
                            </div>
                        )}

                        <input
                            className="login login-input"
                            placeholder="Login"
                            type="text"
                            onChange={setUserLoginFunc}
                            value={localUserLogin}
                        ></input>
                        <input
                            className="login password-input"
                            placeholder="Password"
                            type="text"
                            onChange={setUserPasswordFunc}
                            value={localUserPassword}
                        ></input>
                        {validateError && (
                            <div className="login-error">
                                {betVocabulary.latinWarning}
                            </div>
                        )}
                        <input
                            className="login submit-login-button"
                            type="button"
                            value="Войти"
                            onClick={() => {
                                loginSubmitter(
                                    localUserLogin,
                                    localUserPassword
                                );
                            }}
                        ></input>
                    </div>
                </div>
            </div>
        </>
    );
};
