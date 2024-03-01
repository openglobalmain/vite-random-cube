import { betVocabulary } from "../../assets/vocabulary";
import { IDiceFeatures } from "./IDice";

export function playGame({
  balance,
  bet,
  event,
  currentNumber,
  diceRoll,
}: IDiceFeatures): number {
  let newBalance = balance;

  if (event === betVocabulary.even) {
    if (diceRoll % 2 === 0) {
      newBalance = balance + bet * 2;
    } else {
      newBalance = balance - bet;
    }
  } else if (event === betVocabulary.odd) {
    if (diceRoll % 2 !== 0) {
      newBalance = balance + bet * 2;
    } else {
      newBalance = balance - bet;
    }
  } else if (event === betVocabulary.fromOneToThree) {
    if (diceRoll >= 1 && diceRoll <= 3) {
      newBalance = balance + bet * 2;
    } else {
      newBalance = balance - bet;
    }
  } else if (event === betVocabulary.fromFourToSix) {
    if (diceRoll >= 4 && diceRoll <= 6) {
      newBalance = balance + bet * 2;
    } else {
      newBalance = balance - bet;
    }
  } else if (event === betVocabulary.specificNumber) {
    if (diceRoll == currentNumber) {
      newBalance = balance + bet * 3;
    } else {
      newBalance = balance - bet;
    }
  } else {
    throw new Error(`Недопустимое событие: ${event}`);
  }

  return Math.max(newBalance, 0);
}