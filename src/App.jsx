import React, { useState } from "react";
import O from "/O_mark.webp";
import X from "/X_mark.webp";

const App = () => {
  const BOARD_SIZE = 3; // Size of the Tic Tac Toe board
   // Initialize the board with null values
  const [board, setBoard] = useState(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  
  const [playerTurn, setPlayerTurn] = useState("X"); // Start with player X
  const [winner, setWinner] = useState(null); // Track the winner
  const [moves, setMoves] = useState(1); // Track the number of moves made

  // Function to handle box clicks
  // It updates the board, switches the player turn, and checks for a winner
  const handleBoxClick = (e, rowIndex, colIndex) => {
    e.target.classList.add("disabled"); // disable clicked cell
    setPlayerTurn(playerTurn === "X" ? "O" : "X"); // switch player turn
    // Update the board with the new move
    const newBoard = board.map((row, index) =>
      row.map((cell, j) =>
        index === rowIndex && j === colIndex ? playerTurn : cell
      )
    );
    setBoard(newBoard); // Update the board state
    setMoves(moves + 1); // Increment the move count
    const result = checkWinner(newBoard); // Check for a winner after the move
    // If there is a winner, alert the winner and set the winner state
    if (result) {
      alert(`${result} player wins!`);
      setWinner(result);
    } 
    // If there is no winner and the board is full, alert draw game
    else if (!result && moves === 9) {
      alert("It's a draw!");
      setWinner("Draw");
    }
  };

  // Function to check if there is a winner
  // It checks all possible winning combinations (rows, columns, diagonals)
  const checkWinner = (board) => {
    const winningCombinations = [
      // Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    // Loop through each winning combination to check for a winner
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      // If a player has won, reset the game and return the winner
      if (a && a === b && b === c) {
        // Disable all boxes after a win
        const boxes = document.querySelectorAll(".board-box");
        boxes.forEach((box) => {
          box.classList.add("disabled");
        });
        return a;
      }
    }
  };

  // Function to reset the game
  const resetGame = () => {
    // Reset the board to its initial state
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null))
    );
    // Enable all boxes
    const boxes = document.querySelectorAll(".board-box");
    boxes.forEach((box) => {
      box.classList.remove("disabled");
    });

    setPlayerTurn("X"); // Reset player turn to X
    setWinner(null); // Reset winner state
    setMoves(1); // Reset moves count
  };

  return (
    <>
      <h1 className="title">Tic Tac Toe</h1>

      <h2 className="playersturn">
        {winner
          ? winner !== "Draw"
            ? `${winner} player wins!`
            : "It's a draw!"
          : `${playerTurn} player's turn`}
      </h2>

      <div className="board-container">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="board-box"
                onClick={(e) => handleBoxClick(e, rowIndex, colIndex)}
              >
                {cell === "X" && <img src={X} alt="X" className="mark x" />}
                {cell === "O" && <img src={O} alt="O" className="mark o" />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </>
  );
};

export default App;
