import { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

interface GameLog {
  gameId: number;
  gameName: string;
  createdAt: string;
  winner: string;
}

export const Log = () => {
  const [history, setHistory] = useState<GameLog[]>([]);

  const fetchLog = async () => {
    const response = await fetch("http://localhost:8080/api/get/games", {
      mode: "cors",
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      return;
    }
    setHistory(data);
  };

  useEffect(() => {
    fetchLog();
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List>
        {history.map((game) => (
          <ListItem disablePadding key={game.gameId}>
            <ListItemButton
              component={Link}
              to={{
                pathname: `/game/${game.gameId}`,
                search: `?winner=${game.winner}`,
              }}
            >
              <ListItemText primary={game.gameName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
