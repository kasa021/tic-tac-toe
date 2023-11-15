import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function Square({
  value,
  onClickSquare,
}: {
  value: string;
  onClickSquare: () => void;
}) {
  return (
    <Button
      sx={{
        width: "60px",
        height: "60px",
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));

  const handleClick = (i: number) => {
    if (squares[i] !== "" || calculateWinner(squares)) return;
    const squaresCopy = [...squares];
    xIsNext ? (squaresCopy[i] = "X") : (squaresCopy[i] = "O");
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
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
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Square value={squares[0]} onClickSquare={() => handleClick(0)} />
          <Square value={squares[1]} onClickSquare={() => handleClick(1)} />
          <Square value={squares[2]} onClickSquare={() => handleClick(2)} />
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Square value={squares[3]} onClickSquare={() => handleClick(3)} />
          <Square value={squares[4]} onClickSquare={() => handleClick(4)} />
          <Square value={squares[5]} onClickSquare={() => handleClick(5)} />
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Square value={squares[6]} onClickSquare={() => handleClick(6)} />
          <Square value={squares[7]} onClickSquare={() => handleClick(7)} />
          <Square value={squares[8]} onClickSquare={() => handleClick(8)} />
        </ButtonGroup>
      </Box>
    </>
  );
}

export default App;
