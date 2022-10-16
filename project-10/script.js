// All DOM Elements
const scoreDOM = document.getElementById('score');

// All Required Variables
const snakeBody = ['00', '01', '02', '03'];
let direction = 'right'
let food;
let score = 0;

// All Functions
// 1 - Function to show snake on DOM
const showSnake = () => {
    // reset boxes to show snake at next position
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        if(!box.classList.contains('food')) {
            box.className = 'box'
        }
    });
    // show new position of snake
    snakeBody.forEach(snakeBox => {
        document.getElementById(snakeBox).className = 'box snake-body';
    });
}

// 2 - Function to move snake forward
const moveSnake = () => {
    // give previous parts of snake, the position of next parts
    for(let i = 0; i < snakeBody.length - 1; i++) {
        snakeBody[i] = snakeBody[i+1];
    };

    // calculate next head position according to current direction
    let head, headRow, headCol, nextHeadCol, nextHeadRow;
    switch (direction) {
        case 'left':
            head = snakeBody[snakeBody.length - 1];
            headRow = parseInt(head[0]);
            headCol = parseInt(head[1]);
            nextHeadCol = headCol === 0 ? 9 : headCol - 1;
            snakeBody[snakeBody.length - 1] = `${headRow}${nextHeadCol}`;
            break;
        case 'right':
            head = snakeBody[snakeBody.length - 1];
            headRow = parseInt(head[0]);
            headCol = parseInt(head[1]);
            nextHeadCol = headCol === 9 ? 0 : headCol + 1;
            snakeBody[snakeBody.length - 1] = `${headRow}${nextHeadCol}`;
            break;
        case 'up':
            head = snakeBody[snakeBody.length - 1];
            headRow = parseInt(head[0]);
            headCol = parseInt(head[1]);
            nextHeadRow = headRow === 0 ? 9 : headRow - 1;
            snakeBody[snakeBody.length - 1] = `${nextHeadRow}${headCol}`;
            break;
        case 'down':
            head = snakeBody[snakeBody.length - 1];
            headRow = parseInt(head[0]);
            headCol = parseInt(head[1]);
            nextHeadRow = headRow === 9 ? 0 : headRow + 1;
            snakeBody[snakeBody.length - 1] = `${nextHeadRow}${headCol}`;
            break;
    };
    // show new positions on DOM again
    showSnake();
}

// 3 - Function to generate food
// - Generate food on random location
// - Make sure food should not be on snake body
const generateFood = () => {
    let valid = false;
    while(!valid) {
        valid = true;
        food = `${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`;
        snakeBody.forEach(snakePart => {
            if(food === snakePart) {
                valid = false;
            }
        });
    };
    document.getElementById(food).className = 'box food';
}

// 4 - Function to increase and show score on DOM
const increaseScore = () => {
    score++;
    scoreDOM.innerHTML = `${score}`;
};

// All Event Listeners
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            direction = direction !== 'right' ? 'left' : direction;
            break;
        case 'ArrowRight':
            direction = direction !== 'left' ? 'right' : direction;
            break;
        case 'ArrowUp':
            direction = direction !== 'down' ? 'up' : direction;
            break;
        case 'ArrowDown':
            direction = direction !== 'up' ? 'down' : direction;
            break;
    }
});

// Init
showSnake();
generateFood();

// Using SetInterval, To perform mentioned operations continuously after every 100ms
let interval = setInterval(() => {
    // move forward
    moveSnake();

    // track if snake has eaten the food
    let head = snakeBody[snakeBody.length - 1];
    if(head === food) {
        // increase score
        increaseScore();
        // generate new food
        generateFood();
        // increase snake's length by 1
        snakeBody.unshift('');
    }

    // track self bite
    snakeBody.forEach((part, index) => {
        // avoid head position
        if(index !== (snakeBody.length - 1) && part === head) {
            // stop time/interval
            clearInterval(interval);
            // turn snake into killed
            Array.from(document.querySelectorAll('.snake-body')).forEach(box => {
                box.className = 'box kill';
            })
        }
    })
}, 100);