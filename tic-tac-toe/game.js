// script.js
let scoreX = 0;
let scoreO = 0;
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const handleClick = (e) => {
    const id = e.target.id.split("-")[1];

    if (board[id] || !gameActive) return; // prevent move if cell is filled or game is over
  
    board[id] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer); // for styling
  
    const winner = checkWinner();
  
    if (winner) {
      gameActive = false;
      document.getElementById("result").textContent = `${winner} wins!`;
  
      if (winner === "X") {
        scoreX++;
        document.getElementById("scoreX").textContent = scoreX;
      } else if (winner === "O") {
        scoreO++;
        document.getElementById("scoreO").textContent = scoreO;
      }
    } else if (board.every((cell) => cell)) {
      gameActive = false;
      document.getElementById("result").textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // switch player
    }
  };

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});
const restartGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("result").textContent = "";
  cells.forEach((cell) => (cell.textContent = "")); // clear all cells
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

document.getElementById("restartBtn").addEventListener("click", restartGame);
