// All DOM Elements
const startBtn = document.getElementById('start');
const radioBtns = document.querySelectorAll('input[type="radio"]');
const infoLevel = document.getElementById('info-level');
const infoTime = document.getElementById('info-time');
const infoBonus = document.getElementById('info-bonus');
const gameLevelDOM = document.getElementById('game-level');
const gameTimeDOM = document.getElementById('game-time');
const gameScoreDOM = document.getElementById('game-score');
const wordDOM = document.getElementById('word');
const mainDOM = document.getElementById('main');
const inputDOM = document.getElementById('input');
const resultLevel = document.getElementById('result-level');
const resultScore = document.getElementById('result-score');
const homeBtn = document.getElementById('home');

// All Required Variables
const words = ["velvet","abundant","cave","dollar","emphasis","grace","nomination","texture","beneficiary","disaster","glove","spare","wreck","excess","spy","class","disturbance","panel","get","collar","like","value","assault","application","growth","declaration","heat","belt","dressing","Venus","transmission","mistreat","inch","gesture","diet","realism","exaggerate","string","snake","constant","extract","dump","current","shark","bang","decorative","tower","entry","shake","term","basin","mouth","cycle","snail","ash","monkey","soul","large","root","construct","pension","upset","produce","silver","problem","fragment","session","dimension","snake","freshman","leaf","spot","personality","hostage","improvement","porter","doll","circulation","flexible","appear","prestige","waist","character","clue","interference","miner","message","contact","mixture","pure","distributor","queen","siege","glue","landscape","economy","maximum","drift","visit","tender"]
const rules = {
    easy: {
        time: 15,
        bonus: 5,
    },
    medium: {
        time: 12,
        bonus: 3,
    },
    hard: {
        time: 8,
        bonus: 2,
    },
}
let difficulty = 'easy';
let gameTime = rules[difficulty].time;
let gameBonus = rules[difficulty].bonus;
let gameStarted = false;
let gameScore = 0;
let currentWord = null;

// All Functions
// 1 - Function to update info DOM
const updateInfoDOM = () => {
    infoLevel.innerHTML = `${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1,)}`;
    infoTime.innerHTML = `${gameTime}s`;
    infoBonus.innerHTML = `+${gameBonus}s`;
}

// 2 - Function to Update Game DOM
const updateGameDOM = () => {
    gameLevelDOM.innerHTML = `${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1,)}`;
    gameTimeDOM.innerHTML = `${gameTime}s`;
    gameScoreDOM.innerHTML = gameScore;
}

// 3 - Function to generate random words
const generateRandomWords = () => {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordDOM.innerHTML = currentWord;
}

// 4 - Function to update result DOM
const updateResultDOM = () => {
    resultLevel.innerHTML = `${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1,)}`;
    resultScore.innerHTML = gameScore;
}

// All Event Listeners
// 1 - Event Listener to track changes of difficulty
Array.from(radioBtns).forEach(radioBtn => {
    radioBtn.addEventListener('change', e => {
        difficulty = e.target.value;
        gameTime = rules[difficulty].time;
        gameBonus = rules[difficulty].bonus;
        updateInfoDOM();
    })
})

// 2 - Event listener to start game
startBtn.addEventListener('click', e => {
    updateGameDOM();
    generateRandomWords();
    mainDOM.className = 'game';
    gameStarted = true;
    inputDOM.focus();
});

// 3 - Event Listener to track user's typing
inputDOM.addEventListener('input', e => {
    const userText = e.target.value;
    if(userText === currentWord) {
        gameScore++;
        gameTime += gameBonus;
        updateGameDOM();
        generateRandomWords();
        inputDOM.value = "";
    }
})

// 4 - Event Listener to bounce back to home screen and reset to default values
homeBtn.addEventListener('click', e => {
    difficulty = 'easy';
    gameTime = rules[difficulty].time;
    gameBonus = rules[difficulty].bonus;
    gameStarted = false;
    gameScore = 0;
    currentWord = null;
    inputDOM.value = "";
    document.getElementById('easy').checked = 'true';
    updateInfoDOM();
    updateGameDOM();
    main.className = 'home';
})

// Init
setInterval(() => {
    if(gameStarted) {
        gameTime--;
        updateGameDOM();
        if(gameTime === 0) {
            gameStarted = false;
            updateResultDOM();
            main.className = 'result';
        }
    }
}, 1000);