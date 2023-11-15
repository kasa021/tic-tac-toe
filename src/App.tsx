import { useState } from 'react'
import './App.css'
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";


function App() {
  const [count, setCount] = useState(0)

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
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="text button group">
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default App
