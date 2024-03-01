export function validateMoneyAmount(amount: number): string {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return 'Invalid balance';
    }
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return formattedAmount;
}