export const Dice = ({ count }: { count: number }) => {
    const generateDiceDots = (count: number) => {
        const dots = [];
        const isNeedGridArea =
            !(count != 5 && count != 3 && count != 2 && count != 1);
        for (let i = 0; i < count; i++) {
            dots.push(
                <div
                    key={i}
                    className={`dice-dot-container`}
                    style={isNeedGridArea ? { gridArea: `a${i}` } : {}}
                >
                    <div className="dice-dot"></div>
                </div>
            );
        }
        return dots;
    };

    return (
        <>
            <div className="dice">
                <div className={`grid-dice-results grid-dice-results-${count}`}>
                    {generateDiceDots(count)}
                </div>
            </div>
        </>
    );
};

export default Dice;
