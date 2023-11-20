import { useState } from "react";
import Button from "@mui/material/Button";
import { Board } from "../components/Board";

export const Home = () => {
  const [history, setHistory] = useState<string[]>(["         "]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const xIsNext = currentStep % 2 === 0;
  const currentSquares: string = history[currentStep];

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [
      ...history.slice(0, currentStep + 1),
      nextSquares.join(""),
    ];

    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
  };

  const jumpTo = (step: number) => {
    setCurrentStep(step);
  };

  const moves = history.map((step, move) => {
    if (move !== 0 && step === "         ") {
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
          history={history}
        />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
