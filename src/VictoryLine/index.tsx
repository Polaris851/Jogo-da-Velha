import "./style.css";

type IVictoryLine = {
    direction: "horizontal" | "vertical" | "diagonalToRight" | "diagonalToLeft";
};

const VictoryLine = (props: IVictoryLine) => {

    const {
        direction
    } = props;

    return (
        <div
            className={`victoryLine ${direction}`}
        >
        </div>
    );
}

export default VictoryLine;