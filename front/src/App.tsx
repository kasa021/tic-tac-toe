import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Log } from "./pages/Log.jsx";
import { GameMoves } from "./pages/GameMoves.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/log" element={<Log />}></Route>
          <Route path="/game/:gameId" element={<GameMoves />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
