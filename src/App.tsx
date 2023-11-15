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
      onClick = {onClickSquare}
    >
      {value}
    </Button>
  );
}

function App() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));

  const handleClick = (i: number) => {
    const squaresCopy = [...squares]; 
    squaresCopy[i] = "X";
    setSquares(squaresCopy);
  }

  return (
    <>
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
