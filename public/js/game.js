const gridSize = parseInt(document.getElementById('gameBoard').dataset.gridSize);
const winStreak = parseInt(document.getElementById('gameBoard').dataset.winStreak);
const board = [];
let currentPlayer = 'X';

// Create board and display it
function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  const messageBoard = document.getElementById('messageBoard');
  gameBoard.innerHTML = '';
  messageBoard.textContent = ''; // Clear any previous message
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;


  for (let i = 0; i < gridSize; i++) {
    board[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleMove);
      gameBoard.appendChild(cell);
      board[i][j] = '';
    }
  }
}

// Handle player move
function handleMove(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  // If the cell is already filled, do nothing
  if (board[row][col] !== '') return;

  // Update board and display the current player's symbol
  board[row][col] = currentPlayer;
  event.target.textContent = currentPlayer;

  // After the move, check for a win or a draw
  if (checkWin(row, col)) {
    showMessage(`${currentPlayer} wins!`);
  } else if (isDraw()) {
    showMessage('It\'s a draw!');
  } else {
    // Switch players if no win/draw
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check if the current move resulted in a win
function checkWin(row, col) {
  const directions = [
    { x: 0, y: 1 },  // Horizontal
    { x: 1, y: 0 },  // Vertical
    { x: 1, y: 1 },  // Diagonal
    { x: 1, y: -1 }  // Anti-diagonal
  ];

  for (let { x, y } of directions) {
    let count = 1;

    // Check in both directions (forward and backward)
    for (let i = 1; i < winStreak; i++) {
      if (board[+row + i * x]?.[+col + i * y] === currentPlayer) count++;
      else break;
    }

    for (let i = 1; i < winStreak; i++) {
      if (board[+row - i * x]?.[+col - i * y] === currentPlayer) count++;
      else break;
    }

    // If enough symbols are in a row, the player wins
    if (count >= winStreak) return true;
  }

  return false;
}

// Check for draw
function isDraw() {
  return board.flat().every(cell => cell !== '');
}

// Reset game board
function resetGame() {
  createBoard();
  currentPlayer = 'X';
}

// Show message below the game board
function showMessage(message) {
  const messageBoard = document.getElementById('messageBoard');
  messageBoard.textContent = message;
}

// Initialize the game
createBoard();
