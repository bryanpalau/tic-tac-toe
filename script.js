document.addEventListener('DOMContentLoaded', () => {
    // Star background generation
    function createStarryBackground() {
        const starsContainer = document.querySelector('.stars');
        const numStars = 150; // Number of stars to create

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            
            // Randomly assign star size
            const starType = Math.random();
            if (starType < 0.6) {
                star.className = 'star star--small';
            } else if (starType < 0.9) {
                star.className = 'star star--medium';
            } else {
                star.className = 'star star--large';
            }

            // Randomly position star
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            // Add twinkling effect to some stars
            if (Math.random() < 0.3) {
                star.classList.add('star--twinkle');
                star.style.animationDelay = `${Math.random() * 3}s`;
            }

            starsContainer.appendChild(star);
        }
    }

    // Create stars
    createStarryBackground();

    // Game logic
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const resultScreen = document.querySelector('.board__result');
    const resultTitle = document.querySelector('.result__title');
    const resetButton = document.querySelector('.result__reset');

    let boardState = Array(9).fill(null);
    let currentPlayer = 'x';
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (!gameActive || boardState[index]) return;

        // Update board state and UI
        boardState[index] = currentPlayer;
        cell.classList.add(currentPlayer);

        // Check for win or draw
        if (checkWinner()) {
            endGame(`${currentPlayer.toUpperCase()} Wins!`);
        } else if (boardState.every(cell => cell)) {
            endGame('Draw!');
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function endGame(message) {
        gameActive = false;
        resultTitle.textContent = message;
        resultScreen.style.display = 'flex';
        // Add a small delay to trigger the transition
        setTimeout(() => {
            resultScreen.classList.add('show');
        }, 10);
    }

    function resetGame() {
        boardState = Array(9).fill(null);
        currentPlayer = 'x';
        gameActive = true;
        
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
        });
        
        resultScreen.classList.remove('show');
        // Wait for transition to complete before hiding
        setTimeout(() => {
            resultScreen.style.display = 'none';
        }, 300);
    }

    // Event Listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);
});