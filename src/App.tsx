import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function Square() {
  const [value, setValue] = useState<string>("");
  const handleClick = () => {
    value === "" ? setValue("X") : setValue("");
  }
  return (
    <Button
      sx={{
        width: "60px",
        height: "60px",
      }}
      onClick={handleClick}
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
          <Square />
          <Square />
          <Square />
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Square />
          <Square />
          <Square />
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Square />
          <Square />
          <Square />
        </ButtonGroup>
      </Box>
    </>
  );
}

export default App;
