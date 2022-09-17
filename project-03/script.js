// All DOM Elements
const player1Card = document.getElementById('player-1-card');
const player2Card = document.getElementById('player-2-card');
const message = document.getElementById('message');
const allBoxes = document.getElementsByClassName('box');

// Required Variables
let board = [null,null,null,null,null,null,null,null,null];
let currentPlayer = 1;
let winner = null;

// All Functions
// 1 - Function to toggle current player
const togglePlayer = () => {
    if(winner === null) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        message.innerText = `Player ${currentPlayer} Turn.`;
        if(currentPlayer === 1){
            player1Card.className = "";
            player2Card.className = "disable";
        } else {
            player1Card.className = "disable";
            player2Card.className = "";
        };
    }
};

// 2 - Function to update Board
const updateBoard = () => {
    board.forEach((val, ind) => {
        if(val !== null) {
            document.getElementById(`${ind}`).innerHTML = val === 1 ? 
            '<i class="limegreen fa-solid fa-check"></i>' 
            : 
            '<i class="tomato fa-regular fa-circle"></i>'
        }
    });
};

// 3 - Function to match win sequence 
const matchWinSequence = (loc1, loc2, loc3) => {
    // console.log(board[loc1] === currentPlayer && board[loc2] === currentPlayer && board[loc3] === currentPlayer);
    return board[loc1] === currentPlayer && board[loc2] === currentPlayer && board[loc3] === currentPlayer;
}

// 4 - Function to track winner
const checkWinner = () => {
    if(matchWinSequence(0,1,2)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(0,1,2);
        return;
    }
    if(matchWinSequence(3,4,5)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(3,4,5);
        return;
    }
    if(matchWinSequence(6,7,8)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(6,7,8);
        return;
    }
    if(matchWinSequence(0,3,6)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(0,3,6);
        return;
    }
    if(matchWinSequence(1,4,7)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(1,4,7);
        return;
    }
    if(matchWinSequence(2,5,8)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(2,5,8);
        return;
    }
    if(matchWinSequence(0,4,8)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(0,4,8);
        return;
    }
    if(matchWinSequence(2,4,6)){
        winner = currentPlayer;
        message.innerText = `Player ${currentPlayer} Won.`;
        highlightWinBoxes(2,4,6);
        return;
    }
};

// 5 - Function to show match draw
const checkDraw = () => {
    let totalNullValues = 0;
    board.forEach(val => {
        if(val === null) {
            totalNullValues++;
        };
    });

    if(totalNullValues === 0 && winner === null) {
        message.innerText = `Match Draw.`;
    }
};

// 6 - Function to highlight win boxes
const highlightWinBoxes = (box1,box2,box3) => {
    document.getElementById(`${box1}`).classList.add('win');
    document.getElementById(`${box2}`).classList.add('win');
    document.getElementById(`${box3}`).classList.add('win');
}

// All Event Listeners
// 1 - Event Listener to listen clicks on boxes on board
Array.from(allBoxes).forEach(box => {
    box.addEventListener('click', e => {
        if(!box.classList.contains('checked') && winner === null) {
            box.classList.add('checked');
            board[parseInt(box.id)] = currentPlayer;
            updateBoard();
            checkWinner();
            togglePlayer();
            checkDraw();
        };
    });
});