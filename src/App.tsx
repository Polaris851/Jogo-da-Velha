import { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/game.css';
import VictoryLine from './VictoryLine';

type VictoryPossibilities = {
  direction: "horizontal" | "vertical" | "diagonalToRight" | "diagonalToLeft",
  marks: number[]
}[];

type Players = "O" | "X";

type IWinner = {
  player: Players;
  pathMade: number[];
  direction: "horizontal" | "vertical" | "diagonalToRight" | "diagonalToLeft";
};

const victoryLines: VictoryPossibilities = [
  {
    direction: "horizontal",
    marks: [ 0, 1, 2]
  },
  {
    direction: "horizontal",
    marks: [ 3, 4, 5]
  },
  {
    direction: "horizontal",
    marks: [ 6, 7, 8]
  },
  {
    direction: "vertical",
    marks: [ 0, 3, 6]
  },
  {
    direction: "vertical",
    marks: [1, 4, 7]
  },
  {
    direction: "vertical",
    marks: [2, 5, 8]
  },
  {
    direction: "diagonalToRight",
    marks: [0, 4, 8]
  },
  {
    direction: "diagonalToLeft",
    marks: [2, 4, 6]
  }
];

function App() {
  const [ turn, setTurn] = useState<Players>("O");
  const [ winner, setWinner] = useState<IWinner | null>(null);
  const [ draw, setDraw] = useState<boolean | null>(null);
  const [ marks, setMarks] = useState<{[key: string]: Players}>({});
  const gameOver = !!winner || !!draw;

  function getSquares() {
    return new Array(9).fill(true);
  }

  function play(index: number) {
    if(marks[index] || gameOver) {
      return;
    }
    
    setMarks(prev => ({...prev, [index]: turn}));
    setTurn(prev => prev === "O" ? "X":"O");
  }

  function getCellPlayer(index: number) {
    if(!marks[index]) {
      return;
    }

    return marks[index];
  }

  function getWinner(): IWinner | void {
    for(const line of victoryLines) {
      const [a, b, c] = line.marks;

      if(marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
        return {
          player: turn,
          pathMade: line.marks,
          direction: line.direction
        };
      }
    }
  }

  function startGame() {
    setMarks({});
    setWinner(null);
    setDraw(null);
  }

  useEffect(() => {
    const winner = getWinner();

    if(winner) {
      setWinner(winner)
    } else {
      if(Object.keys(marks).length === 9) {
        setDraw(true);
      }
    }
  }, [marks])

  return (
    <div className="container">

      <h1>Jogo da velha</h1>

      { winner && (
        <>
          <h3>O {winner.player} ganhou</h3> 
        </>
      )}

      { draw && <h3>Empate</h3>}

      { gameOver ? 
          <button onClick={startGame}>Jogar novamente</button>
        : <p>Vez do jogador: {turn}</p> }

      <div className="board">
        {getSquares().map((_, i) => 
          <div
            className={`cell ${getCellPlayer(i)}`}
            onClick={() => play(i)}
            id={i.toString()}
          >
            {winner !== null && winner.pathMade[0] === i && (
              <VictoryLine
                direction={winner.direction}
              />
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
