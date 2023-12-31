import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { List, ListItem } from "@mui/material";

interface GameMoves {
  gameId: number;
  moveNumber: number;
  boardState: string;
}

export const GameMoves = () => {
  const [history, setHistory] = useState<GameMoves[]>([]);
  const [currentBoardState, setCurrentBoardState] = useState<string>("");
  const location = useLocation();
  const gameId = location.pathname.split("/")[2];
  const winner = location.search.split("=")[1];
  console.log(winner);

  const showBoardState = (move: GameMoves) => {
    setCurrentBoardState(move.boardState);
  };

  const fetchMoves = async () => {
    const response = await fetch(
      `http://localhost:8080/api/get/moves/${gameId}`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      return;
    }
    data.sort((a: GameMoves, b: GameMoves) => {
      if (a.moveNumber < b.moveNumber) {
        return -1;
      } else {
        return 1;
      }
    });
    setHistory(data);
    setCurrentBoardState(data[0].boardState);
  };

  useEffect(() => {
    fetchMoves();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {winner === "X" ? (
          <div>Winner: X</div>
        ) : winner === "O" ? (
          <div>Winner: O</div>
        ) : (
          <div>Draw</div>
        )}
        {[0, 1, 2].map((i) => (
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            key={i}
          >
            {[0, 1, 2].map((j) => (
              <Square
                value={currentBoardState ? currentBoardState[i * 3 + j] : ""}
                key={j}
              />
            ))}
          </ButtonGroup>
        ))}
        <List>
          {history.map((move) => (
            <ListItem disablePadding key={move.moveNumber}>
              <ListItemButton onClick={() => showBoardState(move)}>
                <ListItemText primary={move.moveNumber} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

function Square({ value }: { value: string }) {
  return (
    <Button
      sx={{
        width: "60px",
        height: "60px",
      }}
    >
      {value}
    </Button>
  );
}
