const board = document.getElementById('game-board');
const boardState = Array(9).fill(null); // Tracks the state of the board
let currentPlayer = 'X'; // Alternates between 'X' and 'O'

// Dynamically generate the game cells
const cells = Array.from({ length: 9 })
  .map(
    (_, index) => `
    <input type="checkbox" id="cell-${index}" style="--col: ${index % 3}; --row: ${Math.floor(index / 3)}" />
    <label for="cell-${index}" style="--col: ${index % 3}; --row: ${Math.floor(index / 3)}">
      <span>
        <svg class="x">
          <path d="M 20 20 L 80 80" fill="none"></path>
          <path d="M 80 20 L 20 80" fill="none"></path>
        </svg>
        <svg class="o">
          <circle cx="50" cy="50" r="30" fill="none"></circle>
        </svg>
      </span>
    </label>
  `
  )
  .join('');
board.innerHTML = cells;

// Add click listeners to all labels
document.querySelectorAll('label').forEach((label, index) => {
  label.addEventListener('click', () => {
    if (!boardState[index]) {
      boardState[index] = currentPlayer;
      label.querySelector(`.${currentPlayer.toLowerCase()}`).style.display = 'block';

      // Check for winner
      if (checkWinner()) {
        document.querySelector('.board__result--draw .result__title').textContent = `${currentPlayer} Wins!`;
        document.querySelector('.board__result--draw').style.display = 'flex';
      } else if (boardState.every((cell) => cell)) {
        // Check for draw
        document.querySelector('.board__result--draw .result__title').textContent = 'Draw!';
        document.querySelector('.board__result--draw').style.display = 'flex';
      } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });
});

// Reset the game
document.querySelector('.result__reset').addEventListener('click', () => {
  boardState.fill(null); // Reset the board state
  currentPlayer = 'X'; // Reset to player X
  document.querySelectorAll('label span').forEach((span) => {
    span.style.display = 'none'; // Hide all marks
  });
  document.querySelector('.board__result--draw').style.display = 'none'; // Hide the result screen
});

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];
  return winningCombinations.some(
    (combination) =>
      boardState[combination[0]] &&
      boardState[combination[0]] === boardState[combination[1]] &&
      boardState[combination[1]] === boardState[combination[2]]
  );
}
