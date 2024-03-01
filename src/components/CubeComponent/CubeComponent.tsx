import { useDispatch } from "react-redux";
import {
    setActualBalance,
    setActualBet,
    setActualBetSide,
    setActualSide, setTypeOfUserChoice,
    setUserInfoObj
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

    const {
        data: actualUserInfo,
        isSuccess: actualUserInfoSuccess,
    } = useGetCurrentUserQuery();

    const actualBalance = useAppSelector((state) => state.products.userBalance);
    const actualBet = useAppSelector((state) => state.products.userBet);
    const actualChoice = useAppSelector((state) => state.products.userChoice);
    const actualDiceSide = useAppSelector((state) => state.products.diceSide);
    const actualDiceBetSide = useAppSelector(
        (state) => state.products.diceBetSide
    );
    const actualCurrency = useAppSelector(
        (state) => state.products.userInfoObj.currency
    );
    const isPlayerCanPlay = parseFloat(actualBalance) > 0;

    const [actualBenefits, setActualBenefits] = useState<number>(0);
    const [wasBetAdded, setWasBetAdded] = useState<boolean>(false);
    const [isWinned, setIsWinned] = useState<boolean>(false);

    const isLoggedIn = useAppSelector(
        (state) => state.products.userInfoObj.active
    );

    const isSubmitDisable =
        parseFloat(actualBalance) < parseFloat(actualBet) ||
        actualChoice === "no" ||
        actualBet === undefined;

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
        ].filter((item) => parseFloat(item) <= parseFloat(actualBalance));
    };

    useEffect(() => {
        dispatch(
            setActualBet(valueExample.length === 0 ? valueExample()[0] : "")
        );
    }, [actualBalance]);

    useEffect(() => {
        if (actualUserInfo && actualUserInfo.error != true) {
            console.log(actualUserInfo)
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
            balance: parseFloat(actualBalance),
            bet: parseFloat(actualBet),
            event: actualChoice,
            currentNumber: actualDiceBetSide,
            diceRoll: diceRoll,
        });
        if (actualLocalBalance > parseFloat(actualBalance)) {
            setIsWinned(true);
            setActualBenefits(actualLocalBalance - parseFloat(actualBalance));
        } else {
            setIsWinned(false);
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
                    isWinned={isWinned}
                    actualDiceSide={actualDiceSide}
                    actualBenefits={actualBenefits}
                    actualCurrency={actualCurrency}
                    isPlayerCanPlay={isPlayerCanPlay}
                />
                <div
                    className={
                        isLoggedIn
                            ? "cube-container active"
                            : "cube-container passive"
                    }
                >
                    <div className="dice-container">
                        <Dice count={actualDiceSide} />
                    </div>

                    <div className="selector-container">
                        <div className="text">{betVocabulary.betSize}</div>
                        <select
                            className={`bet-amount ${valueExample().length === 0 ? "disabled" : ""}`}
                            onChange={setNewUserBet}
                            ref={selectRef}
                            value={actualBet}
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
                                    actualChoice === betVocabulary.even
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                {betVocabulary.even}
                            </button>
                            <button
                                className={
                                    actualChoice === betVocabulary.odd
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                {betVocabulary.odd}
                            </button>
                            <button
                                className={
                                    actualChoice ===
                                    betVocabulary.fromOneToThree
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                От 1 до 3
                            </button>
                            <button
                                className={
                                    actualChoice === betVocabulary.fromFourToSix
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                От 4 до 6
                            </button>
                            <button
                                className={
                                    actualChoice ===
                                    betVocabulary.specificNumber
                                        ? "active"
                                        : "non-active"
                                }
                                onClick={newUserChoice}
                            >
                                <span>{betVocabulary.specificNumber}</span>
                                <input
                                    className="bet-value-input"
                                    type="text"
                                    value={actualDiceBetSide}
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
