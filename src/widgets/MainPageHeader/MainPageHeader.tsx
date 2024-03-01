import React from "react";

export const MainPageHeader = ({
    isLoggedIn,
    wasBetAdded,
    isWinned,
    actualDiceSide,
    actualBenefits,
    actualCurrency,
    isPlayerCanPlay
}: {
    isLoggedIn: boolean;
    wasBetAdded: boolean;
    isWinned: boolean;
    actualDiceSide: number;
    actualBenefits: number;
    actualCurrency: string;
    isPlayerCanPlay: boolean;
}) => {
    
    return (
        <div>
            {isLoggedIn ? (
                wasBetAdded ? (
                    <React.Fragment>
                        <h3>Результат броска кубика: {actualDiceSide}</h3>
                        {isPlayerCanPlay ? (
                            <React.Fragment>
                                {isWinned ? (
                                    <h4>
                                        Вы выиграли: {actualBenefits}{" "}
                                        {actualCurrency}!{" "}
                                    </h4>
                                ) : (
                                    <h4>Повезет в следующий раз</h4>
                                )}
                            </React.Fragment>
                        ) : (
                            <h4>Вы проиграли все, повезет в другой раз!</h4>
                        )}
                    </React.Fragment>
                ) : (
                    <h3>Сделайте ставку</h3>
                )
            ) : (
                <h3>Войдите, чтобы продолжить</h3>
            )}
        </div>
    );
};
