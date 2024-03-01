import { useDispatch } from "react-redux";
import { betVocabulary } from "../../assets/vocabulary";
import { validateMoneyAmount } from "../../features/currencyValidator/currencyValidator";
import { useAppSelector } from "../../stateManager/hooks/redux";
import {
    clearReduxState,
    setActualBalance,
    setLoginWidgetActive,
} from "../../stateManager/reducers/UserInfoSlice";
import { clearWebStorage } from "../../features/webStorageSaver";

export const Header = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useAppSelector(
        (state) => state.products.userInfoObj.active
    );
    const actualBalance = useAppSelector((state) => state.products.userBalance);
    const actualCurrency = useAppSelector(
        (state) => state.products.userInfoObj.currency
    );

    function showMeLoginWidget() {
        dispatch(setLoginWidgetActive(true));
    }

    function updateBalance() {
        dispatch(
            setActualBalance(parseFloat(actualBalance) + parseFloat("10"))
        );
    }

    function signOutToLoginWidget() {
        dispatch(clearReduxState());
        clearWebStorage();
        // ! Из-за отсутствия запроса на очистку cookies нет возможности полноценно выйти из профиля
        // ! При выходе и последубщем обновлении страницы у нас будет подтянута информация о последнем пользователе в системе
    }

    function showMeRegisterWidget() {}
    // Потенциальная ф-ия регистрации

    return (
        <>
            <div className="header-div">
                <div className="header-output company-name">Test Game</div>
                {isLoggedIn ? (
                    <div className="header-output balance-layout">
                        {validateMoneyAmount(parseFloat(actualBalance))} (
                        {actualCurrency})
                        <button
                            className="login-button sign-in-button"
                            onClick={updateBalance}
                        >
                            {betVocabulary.updateBalance}
                        </button>
                        <button
                            className="login-button sign-in-button"
                            onClick={signOutToLoginWidget}
                        >
                            {betVocabulary.signOut}
                        </button>
                    </div>
                ) : (
                    <div className="header-output login-buttons-container">
                        <button
                            className="login-button sign-in-button"
                            onClick={showMeLoginWidget}
                        >
                            {betVocabulary.signIn}
                        </button>
                        <button
                            className="login-button registration-button"
                            onClick={showMeRegisterWidget}
                        >
                            {betVocabulary.register}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
