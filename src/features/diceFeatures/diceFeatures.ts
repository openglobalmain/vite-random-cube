import { betVocabulary } from "../../assets/vocabulary";
import { IDiceFeatures } from "../../models/IDice";

function resultValue(newBalance: number, count: number) {
    return Math.max(newBalance, count);
}

function updateBalance(
    balance: number,
    bet: number,
    multiplier: number,
    update: boolean
) {
    return update ? balance + bet * multiplier : balance - bet;
}

export function playGame({
    balance,
    bet,
    event,
    currentNumber,
    diceRoll,
}: IDiceFeatures): number {
    let newBalance = balance;

    switch (event) {
        case betVocabulary.even:
            newBalance = updateBalance(newBalance, bet, 2, diceRoll % 2 === 0);
            break;
        case betVocabulary.odd:
            newBalance = updateBalance(newBalance, bet, 2, diceRoll % 2 !== 0);
            break;
        case betVocabulary.fromOneToThree:
            newBalance = updateBalance(
                newBalance,
                bet,
                2,
                diceRoll >= 1 && diceRoll <= 3
            );
            break;
        case betVocabulary.fromFourToSix:
            newBalance = updateBalance(
                newBalance,
                bet,
                2,
                diceRoll >= 4 && diceRoll <= 6
            );
            break;
        case betVocabulary.specificNumber:
            newBalance = updateBalance(
                newBalance,
                bet,
                3,
                diceRoll === currentNumber
            );
            break;
        default:
            throw new Error(`${betVocabulary.unrealEvent} ${event}`);
    }

    return resultValue(newBalance, 0);
}
