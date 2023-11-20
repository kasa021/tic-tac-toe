import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function Square({
  value,
  onClickSquare,
  win,
}: {
  value: string;
  onClickSquare: () => void;
  win: boolean;
}) {
  return (
    <Button
      sx={{
        width: "60px",
        height: "60px",
        backgroundColor: win ? "yellow" : "black",
      }}
      onClick={onClickSquare}
    >
      {value}
    </Button>
  );
}

function calculateWinner(squares: string[]) {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] !== " "
    ) {
      return lines[i];
    }
  }
  return null;
}

function Board({
  xIsNext,
  squares,
  onPlay,
  currentStep,
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
  currentStep: number;
}) {
  const handleClick = (i: number) => {
    if (squares[i] === "X" || squares[i] === "O" || calculateWinner(squares)) {
      return;
    }
    const squaresCopy = [...squares];
    xIsNext ? (squaresCopy[i] = "X") : (squaresCopy[i] = "O");
    onPlay(squaresCopy);
    console.log(xIsNext);
  };

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = "Winner: " + squares[winner[0]];
  } else if (currentStep !== 9) {
    status = "Next player: " + (xIsNext ? "X" : "O");
  } else {
    status = "Draw";
  }

  return (
    <>
      <div>{status}</div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            key={i}
          >
            {[0, 1, 2].map((j) => (
              <Square
                value={squares[i * 3 + j]}
                onClickSquare={() => handleClick(i * 3 + j)}
                win={!!winner && winner.includes(i * 3 + j)}
                key={j}
              />
            ))}
          </ButtonGroup>
        ))}
      </Box>
    </>
  );
}

export const  Home = () => {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(" ")]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const xIsNext = currentStep % 2 === 0;
  const currentSquares: string[] = history[currentStep];

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentStep + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
  };

  const jumpTo = (step: number) => {
    setCurrentStep(step);
  };

  const moves = history.map((step, move) => {
    if (move !== 0 && step.every((s) => s === " ")) {
      return;
    }
    const desc = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <Button onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    );
  });

  return (
    <div>
      <div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentStep={currentStep}
        />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
