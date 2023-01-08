const tiles = Array.from(document.getElementsByClassName('tile'));
const playerDisplay = document.querySelector('.display-player');
const newGameButton = document.getElementById('newGame');
const announcer = document.querySelector('.announcer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

let turn = 0;

const xWon = 'xWon';
const oWon = 'oWon';
const tie = 'tie';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const isValidAction = (tile) => {
    if (tile.innerHTML === 'X' || tile.innerHTML === 'O'){
        return false;
    }

    return true;
};

const updateBoard =  (index) => {
    board[index] = currentPlayer;
}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerHTML = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (tile, index) => {
    if(isValidAction(tile) && gameActive) {
        turn++;
        tile.innerHTML = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);

        if (turn >= 5)
        {
            checkIfWon();
        }

        changePlayer();
    }
}

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    turn = 0;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

function checkIfWon() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

if (roundWon) {
        announce(currentPlayer === 'X' ? xWon : oWon);
        gameActive = false;
        return;
    }

if (!board.includes(''))
    announce(tie);
}

const announce = (type) => {
    switch(type){
        case oWon:
            announcer.innerHTML = 'Player O Won!';

            if (announcer.classList.contains('alert-secondary'))
            {
                announcer.classList.remove('alert.secondary');
                announcer.classList.add('alert-success');
            }
            break;
        case xWon:
            announcer.innerHTML = 'Player X Won!';

            if (announcer.classList.contains('alert-secondary'))
            {
                announcer.classList.remove('alert.secondary');
                announcer.classList.add('alert-success');
            }
            break;
        case tie:
            announcer.innerText = 'Tie';
            
            if (announcer.classList.contains('alert-success'))
            {
                announcer.classList.remove('alert-success');
                announcer.classList.add('alert-secondary');
            }
    }

    announcer.classList.remove('hide');
};

tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

newGameButton.addEventListener('click', resetBoard);
