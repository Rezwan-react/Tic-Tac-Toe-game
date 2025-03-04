let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    createBoard();
    checkWinner();
    if (gameActive) {
        currentPlayer = 'O';
        document.getElementById('status').innerText = "Computer's Turn";
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (!gameActive) return;
    let emptyCells = board.map((val, index) => (val === '' ? index : null)).filter(val => val !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        createBoard();
        checkWinner();
        if (gameActive) {
            currentPlayer = 'X';
            document.getElementById('status').innerText = "Player X's Turn";
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('status').innerText = `Player ${board[a]} Wins!`;
            return;
        }
    }
    
    if (!board.includes('')) {
        gameActive = false;
        document.getElementById('status').innerText = "It's a Draw! But the Computer still wins!";
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').innerText = "Player X's Turn";
    createBoard();
}

createBoard();