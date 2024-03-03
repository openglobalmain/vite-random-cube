import { betVocabulary } from "../../assets/vocabulary";
import { IDiceFeatures } from "../../models/IDice";

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
      if (diceRoll % 2 === 0) {
        newBalance = balance + bet * 2;
      } else {
        newBalance = balance - bet;
      }
      break;
    case betVocabulary.odd:
      if (diceRoll % 2 !== 0) {
        newBalance = balance + bet * 2;
      } else {
        newBalance = balance - bet;
      }
      break;
    case betVocabulary.fromOneToThree:
      if (diceRoll >= 1 && diceRoll <= 3) {
        newBalance = balance + bet * 2;
      } else {
        newBalance = balance - bet;
      }
      break;
    case betVocabulary.fromFourToSix:
      if (diceRoll >= 4 && diceRoll <= 6) {
        newBalance = balance + bet * 2;
      } else {
        newBalance = balance - bet;
      }
      break;
    case betVocabulary.specificNumber:
      if (diceRoll == currentNumber) {
        newBalance = balance + bet * 3;
      } else {
        newBalance = balance - bet;
      }
      break;
    default:
      throw new Error(`Недопустимое событие: ${event}`);
  }

  return Math.max(newBalance, 0);
}