import React, { useState } from "react";
import "./SudokuBoard.css";

const initialPuzzle = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];

const solution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];


function SudokuBoard() {
  const [board, setBoard] = useState(initialPuzzle.map(row => row.slice()));
  const [selected, setSelected] = useState({ row: null, col: null });
  const [status, setStatus] = useState("");
  const [picker, setPicker] = useState(false);

  const handleCellClick = (row, col) => {
    if (initialPuzzle[row][col] !== null) return;
    setSelected({ row, col });
    setPicker(true);
  };

  const handleNumberPick = (num) => {
    if (selected.row === null || selected.col === null) return;
    const newBoard = board.map(r => r.slice());
    newBoard[selected.row][selected.col] = num;
    setBoard(newBoard);
    setPicker(false);
  };

  const handleBlur = () => {
    setPicker(false);
    setSelected({ row: null, col: null });
  };

  const checkSolution = () => {
    let correct = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if ((board[r][c] || 0) !== solution[r][c]) {
          correct = false;
        }
      }
    }
    setStatus(correct ? "✅ Correct Solution!" : "❌ Some answers are wrong!");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className="sudoku-board-wrapper">
      <div className="sudoku-board">
        {board.map((row, r) =>
          row.map((num, c) => {
            const isPrefilled = initialPuzzle[r][c] !== null;
            const isSelected = selected.row === r && selected.col === c;
            const isRow = selected.row === r && selected.col !== null;
            const isCol = selected.col === c && selected.row !== null;
            const blockRight = (c + 1) % 3 === 0 && c !== 8;
            const blockBottom = (r + 1) % 3 === 0 && r !== 8;
            const outerTop = r === 0;
            const outerLeft = c === 0;
            const outerBottom = r === 8;
            const outerRight = c === 8;
            const cellClasses = [
              "cell",
              isPrefilled ? "prefilled" : "to-fill",
              isSelected ? "selected" : "",
              isRow ? "row-highlight" : "",
              isCol ? "col-highlight" : "",
              blockRight ? "block-right" : "",
              blockBottom ? "block-bottom" : "",
              outerTop ? "outer-top" : "",
              outerLeft ? "outer-left" : "",
              outerBottom ? "outer-bottom" : "",
              outerRight ? "outer-right" : ""
            ].filter(Boolean).join(" ");
            return (
              <div
                key={`${r}-${c}`}
                tabIndex={isPrefilled ? -1 : 0}
                className={cellClasses}
                onClick={() => handleCellClick(r, c)}
                style={{outline: "none"}}
              >
                {num !== null ? num : ""}
              </div>
            );
          })
        )}
      </div>
      <div className="sudoku-col-numbers">
        {Array.from({ length: 9 }, (_, i) => {
          const isActive = picker && selected.row !== null && selected.col !== null;
          const isSelectedNum = isActive && board[selected.row][selected.col] === i + 1;
          return (
            <div
              className={
                "col-number" +
                (isActive ? " selectable" : "") +
                (isSelectedNum ? " selected" : "")
              }
              key={i}
              onClick={() => isActive && handleNumberPick(i + 1)}
              tabIndex={isActive ? 0 : -1}
              style={{ pointerEvents: isActive ? "auto" : "none", userSelect: "none" }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <button className="check-btn" onClick={checkSolution}>Check Solution</button>
      {status && <div className="status-msg">{status}</div>}
    </div>
  );
}

export default SudokuBoard;
