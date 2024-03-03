import { useDispatch } from "react-redux";
import {
    setActualBalance,
    setActualBet,
    setActualBetSide,
    setActualSide,
    setTypeOfUserChoice,
    setUserInfoObj,
} from "../../stateManager/reducers/UserInfoSlice";
import { playGame } from "../../features/diceFeatures/diceFeatures";
import { useAppSelector } from "../../stateManager/hooks/redux";
import { useEffect, useRef, useState } from "react";
import { Dice } from "../../widgets/Dice";
import { MainPageHeader } from "../../widgets/MainPageHeader";
import { betVocabulary } from "../../assets/vocabulary";
import { useGetCurrentUserQuery } from "../../api/apiSlice";

export const CubeComponent = () => {
    const dispatch = useDispatch();

    const selectRef = useRef(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { data: actualUserInfo, isSuccess: actualUserInfoSuccess } =
        useGetCurrentUserQuery();

    const {
        userBalance,
        userBet,
        userChoice,
        diceSide: userDiceSide,
        diceBetSide: userDiceBetSide,
    } = useAppSelector((state) => state.userInfo);
    const userCurrency = useAppSelector(
        (state) => state.userInfo.userInfoObj.currency
    );
    const isPlayerCanPlay = parseFloat(userBalance) > 0;

    const [actualBenefits, setActualBenefits] = useState<number>(0);
    const [wasBetAdded, setWasBetAdded] = useState<boolean>(false);
    const [isWon, setIsWon] = useState<boolean>(false);

    const isLoggedIn = useAppSelector(
        (state) => state.userInfo.userInfoObj.active
    );

    const isSubmitDisable =
        parseFloat(userBalance) < parseFloat(userBet) ||
        userChoice === "no" ||
        userBet === undefined;

    const valueExample = () => {
        return [
            "1.00",
            "2.00",
            "3.00",
            "5.00",
            "10.00",
            "25.00",
            "60.00",
            "100.00",
        ].filter((item) => parseFloat(item) <= parseFloat(userBalance));
    };

    useEffect(() => {
        dispatch(
            setActualBet(valueExample.length === 0 ? valueExample()[0] : "")
        );
    }, [userBalance]);

    useEffect(() => {
        if (actualUserInfo && actualUserInfo.error != true) {
            dispatch(setUserInfoObj(actualUserInfo));
        }
    }, [actualUserInfo, actualUserInfoSuccess]);

    function newUserChoice(event: any) {
        if (event.target.innerText != "") {
            dispatch(setTypeOfUserChoice(event.target.innerText));
        }
    }

    function setNewUserBet(event: any) {
        const value = parseFloat(event.target.value);
        dispatch(setActualBet(value.toString() + ".00"));
    }

    function setNewUserSide(event: any) {
        const value = event.target.value;
        const regex = /^[1-6]$/;
        if (value === "" || regex.test(value)) {
            dispatch(setActualBetSide(value));
        }
    }

    function setNewDataFromBet() {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        const actualLocalBalance = playGame({
            balance: parseFloat(userBalance),
            bet: parseFloat(userBet),
            event: userChoice,
            currentNumber: userDiceBetSide,
            diceRoll: diceRoll,
        });
        if (actualLocalBalance > parseFloat(userBalance)) {
            setIsWon(true);
            setActualBenefits(actualLocalBalance - parseFloat(userBalance));
        } else {
            setIsWon(false);
        }
        dispatch(setActualSide(diceRoll));
        dispatch(setActualBalance(actualLocalBalance));
        handleNewDiceSide();
    }

    function handleNewDiceSide() {
        setWasBetAdded(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (isPlayerCanPlay) {
            timeoutRef.current = setTimeout(() => {
                setWasBetAdded(false);
            }, 2600);
        }
    }

    return (
        <>
            <div className="main-page-container">
                <MainPageHeader
                    isLoggedIn={isLoggedIn}
                    wasBetAdded={wasBetAdded}
                    isWon={isWon}
                    actualDiceSide={userDiceSide}
                    actualBenefits={actualBenefits}
                    actualCurrency={userCurrency}
                    isPlayerCanPlay={isPlayerCanPlay}
                />
                <div
                    className={`cube-container " ${isLoggedIn ? "active" : "passive"}`}
                >
                    <div className="dice-container">
                        <Dice count={userDiceSide} />
                    </div>

                    <div className="selector-container">
                        <div className="text">{betVocabulary.betSize}</div>
                        <select
                            className={`bet-amount ${valueExample().length === 0 ? "disabled" : ""}`}
                            onChange={setNewUserBet}
                            ref={selectRef}
                            value={userBet}
                        >
                            {valueExample().length === 0 ? (
                                <option>Недостаточный баланс</option>
                            ) : (
                                valueExample().map((item) => (
                                    <option key={item}>{item}</option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="buttons-container">
                        <div className="text">{betVocabulary.betVariants}</div>
                        <div className="buttons-inside">
                            <button
                                className={
                                    userChoice === betVocabulary.even
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                {betVocabulary.even}
                            </button>
                            <button
                                className={
                                    userChoice === betVocabulary.odd
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                {betVocabulary.odd}
                            </button>
                            <button
                                className={
                                    userChoice === betVocabulary.fromOneToThree
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                От 1 до 3
                            </button>
                            <button
                                className={
                                    userChoice === betVocabulary.fromFourToSix
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                От 4 до 6
                            </button>
                            <button
                                className={
                                    userChoice === betVocabulary.specificNumber
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                <span>{betVocabulary.specificNumber}</span>
                                <input
                                    className="bet-value-input"
                                    type="text"
                                    value={userDiceBetSide}
                                    onChange={setNewUserSide}
                                    onClick={() => {
                                        dispatch(
                                            setTypeOfUserChoice(
                                                betVocabulary.specificNumber
                                            )
                                        );
                                    }}
                                ></input>
                            </button>
                        </div>
                    </div>
                    <div className="bet-submit-button-container">
                        <button
                            className={`bet-submit-button ${isSubmitDisable ? "disabled" : ""}`}
                            onClick={setNewDataFromBet}
                        >
                            {betVocabulary.bet}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
