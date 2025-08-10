import React from "react";
import SudokuBoard from "./SudokuBoard";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Sudoku Game</h1>
      <SudokuBoard />
    </div>
  );
}

export default App;
