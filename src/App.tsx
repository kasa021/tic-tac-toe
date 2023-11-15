import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function Square({ value }: { value: string }) {
  return (
    <Button
      sx={{
        width: "60px",
      }}
    >
      {value}
    </Button>
  );
}

function App() {
  const [count, setCount] = useState(0);

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
          <Square value="1" />
          <Square value="2" />
          <Square value="3" />
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Square value="4" />
          <Square value="5" />
          <Square value="6" />
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Square value="7" />
          <Square value="8" />
          <Square value="9" />
        </ButtonGroup>
      </Box>
    </>
  );
}

export default App;
